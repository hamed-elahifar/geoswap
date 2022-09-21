// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./libraries/BoringERC20.sol";
import "./IGeosPair.sol";

import "hardhat/console.sol";

contract GeosDistributorV2 is Ownable, ReentrancyGuard {
    using BoringERC20 for IBoringERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        uint256 rewardLockedUp; // Reward locked up.
        uint256 nextHarvestUntil; // When can the user harvest again.
    }

    // Info of each pool.
    struct PoolInfo {
        IBoringERC20 lpToken; // Address of LP token contract.
        uint256 allocPoint; // How many allocation points assigned to this pool. Geos to distribute per block.
        uint256 lastRewardTimestamp; // Last block number that Geos distribution occurs.
        uint256 accGeosPerShare; // Accumulated Geos per share, times 1e18. See below.
        uint16 depositFeeBP; // Deposit fee in basis points
        uint256 harvestInterval; // Harvest interval in seconds
        uint256 totalLp; // Total token in Pool
    }

    IBoringERC20 public geos;

    uint256 public mintedGeos;

    // Geos tokens created per second
    uint256 public geosPerSec;

    // Max harvest interval: 14 days
    uint256 public constant MAXIMUM_HARVEST_INTERVAL = 14 days;

    // Maximum deposit fee rate: 10%
    uint16 public constant MAXIMUM_DEPOSIT_FEE_RATE = 1000;

    // Info of each pool
    PoolInfo[] public poolInfo;

    mapping(address => uint256) poolIndex;

    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;

    // The timestamp when Geos mining starts.
    uint256 public startTimestamp;

    // Total locked up rewards
    uint256 public totalLockedUpRewards;

    // Total Geos in Geos Pools (can be multiple pools)
    uint256 public totalGeosInPools = 0;

    // Team address.
    address public teamAddress;

    // Treasury address.
    address public treasuryAddress;

    // Investor address.
    address public investorAddress;

    // Percentage of pool rewards that goto the team.
    uint256 public teamPercent;

    // Percentage of pool rewards that goes to the treasury.
    uint256 public treasuryPercent;

    // Percentage of pool rewards that goes to the investor.
    uint256 public investorPercent;

    // The precision factor
    uint256 private immutable ACC_TOKEN_PRECISION = 1e12;

    modifier validatePoolByPid(uint256 _pid) {
        require(_pid < poolInfo.length, "Pool does not exist");
        _;
    }

    event Add(
        uint256 indexed pid,
        uint256 allocPoint,
        IBoringERC20 indexed lpToken,
        uint16 depositFeeBP,
        uint256 harvestInterval
    );

    event Set(
        uint256 indexed pid,
        uint256 allocPoint,
        uint16 depositFeeBP,
        uint256 harvestInterval
    );

    event UpdatePool(
        uint256 indexed pid,
        uint256 lastRewardTimestamp,
        uint256 lpSupply,
        uint256 accGeosPerShare
    );

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);

    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);

    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );

    event EmissionRateUpdated(
        address indexed caller,
        uint256 previousValue,
        uint256 newValue
    );

    event RewardLockedUp(
        address indexed user,
        uint256 indexed pid,
        uint256 amountLockedUp
    );

    event AllocPointsUpdated(
        address indexed caller,
        uint256 previousAmount,
        uint256 newAmount
    );

    event SetTeamAddress(
        address indexed oldAddress,
        address indexed newAddress
    );

    event SetTreasuryAddress(
        address indexed oldAddress,
        address indexed newAddress
    );

    event SetInvestorAddress(
        address indexed oldAddress,
        address indexed newAddress
    );

    event SetTeamPercent(uint256 oldPercent, uint256 newPercent);

    event SetTreasuryPercent(uint256 oldPercent, uint256 newPercent);

    event SetInvestorPercent(uint256 oldPercent, uint256 newPercent);

    constructor(
        IBoringERC20 _geos,
        uint256 _geosPerSec,
        address _teamAddress,
        address _treasuryAddress,
        address _investorAddress,
        uint256 _teamPercent,
        uint256 _treasuryPercent,
        uint256 _investorPercent
    ) {
        require(
            _teamPercent <= 1000,
            "constructor: invalid team percent value"
        );
        require(
            _treasuryPercent <= 1000,
            "constructor: invalid treasury percent value"
        );
        require(
            _investorPercent <= 1000,
            "constructor: invalid investor percent value"
        );
        require(
            _teamPercent + _treasuryPercent + _investorPercent <= 1000,
            "constructor: total percent over max"
        );

        //StartBlock always many years later from contract const ruct, will be set later in StartFarming function
        startTimestamp = block.timestamp + (60 * 60 * 24 * 365);

        geos = _geos;
        geosPerSec = _geosPerSec;

        teamAddress = _teamAddress;
        treasuryAddress = _treasuryAddress;
        investorAddress = _investorAddress;

        teamPercent = _teamPercent;
        treasuryPercent = _treasuryPercent;
        investorPercent = _investorPercent;
    }

    // Set farming start, can call only once
    function startFarming() public onlyOwner {
        require(
            block.timestamp < startTimestamp,
            "start farming: farm started already"
        );

        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            PoolInfo storage pool = poolInfo[pid];
            pool.lastRewardTimestamp = block.timestamp;
        }

        startTimestamp = block.timestamp;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    // Can add multiple pool with same lp token without messing up rewards, because each pool's balance is tracked using its own totalLp
    function add(
        uint256 _allocPoint,
        IBoringERC20 _lpToken,
        uint16 _depositFeeBP,
        uint256 _harvestInterval
    ) public onlyOwner {
        // require(
        //     _depositFeeBP <= MAXIMUM_DEPOSIT_FEE_RATE,
        //     "add: deposit fee too high"
        // );
        require(
            _harvestInterval <= MAXIMUM_HARVEST_INTERVAL,
            "add: invalid harvest interval"
        );
        require(
            Address.isContract(address(_lpToken)),
            "add: LP token must be a valid contract"
        );

        require(poolIndex[address(_lpToken)] == 0, "addPool: EXISTED POOL");

        _massUpdatePools();

        uint256 lastRewardTimestamp = block.timestamp > startTimestamp
            ? block.timestamp
            : startTimestamp;

        totalAllocPoint += _allocPoint;

        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                allocPoint: _allocPoint,
                lastRewardTimestamp: lastRewardTimestamp,
                accGeosPerShare: 0,
                depositFeeBP: _depositFeeBP,
                harvestInterval: _harvestInterval,
                totalLp: 0
            })
        );

        poolIndex[address(_lpToken)] = poolInfo.length;

        emit Add(
            poolInfo.length - 1,
            _allocPoint,
            _lpToken,
            _depositFeeBP,
            _harvestInterval
        );
    }

    // Update the given pool's Geos allocation point and deposit fee. Can only be called by the owner.
    function set(
        uint256 _pid,
        uint256 _allocPoint,
        uint16 _depositFeeBP,
        uint256 _harvestInterval
    ) public onlyOwner validatePoolByPid(_pid) {
        // require(
        //     _depositFeeBP <= MAXIMUM_DEPOSIT_FEE_RATE,
        //     "set: deposit fee too high"
        // );
        require(
            _harvestInterval <= MAXIMUM_HARVEST_INTERVAL,
            "set: invalid harvest interval"
        );

        _massUpdatePools();

        totalAllocPoint =
            totalAllocPoint -
            poolInfo[_pid].allocPoint +
            _allocPoint;

        poolInfo[_pid].allocPoint = _allocPoint;
        poolInfo[_pid].depositFeeBP = _depositFeeBP;
        poolInfo[_pid].harvestInterval = _harvestInterval;

        emit Set(
            _pid,
            _allocPoint,
            _depositFeeBP,
            _harvestInterval
        );
    }

    // View function to see pending rewards on frontend.
    function pendingTokens(uint256 _pid, address _user)
        external
        view
        validatePoolByPid(_pid)
        returns (
            address[] memory addresses,
            string[] memory symbols,
            uint256[] memory decimals,
            uint256[] memory amounts
        )
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accGeosPerShare = pool.accGeosPerShare;
        uint256 lpSupply = pool.totalLp;

        addresses = new address[](1);
        symbols = new string[](1);
        decimals = new uint256[](1);
        amounts = new uint256[](1);

        if (block.timestamp > pool.lastRewardTimestamp && lpSupply != 0) {
            uint256 multiplier = block.timestamp - pool.lastRewardTimestamp;
            uint256 total = 1000;
            uint256 lpPercent = total -
                teamPercent -
                treasuryPercent -
                investorPercent;

            uint256 geosReward = (multiplier *
                geosPerSec *
                pool.allocPoint *
                lpPercent) /
                totalAllocPoint /
                total;

            accGeosPerShare += (
                ((geosReward * ACC_TOKEN_PRECISION) / lpSupply)
            );
        }

        uint256 pendingGeos = (((user.amount * accGeosPerShare) /
            ACC_TOKEN_PRECISION) - user.rewardDebt) + user.rewardLockedUp;

        addresses[0] = address(geos);
        symbols[0] = IBoringERC20(geos).safeSymbol();
        decimals[0] = IBoringERC20(geos).safeDecimals();
        amounts[0] = pendingGeos;
    }

    /// @notice View function to see pool rewards per sec
    function poolRewardsPerSec(uint256 _pid)
        external
        view
        validatePoolByPid(_pid)
        returns (
            address[] memory addresses,
            string[] memory symbols,
            uint256[] memory decimals,
            uint256[] memory rewardsPerSec
        )
    {
        PoolInfo storage pool = poolInfo[_pid];

        addresses = new address[](1);
        symbols = new string[](1);
        decimals = new uint256[](1);
        rewardsPerSec = new uint256[](1);

        addresses[0] = address(geos);
        symbols[0] = IBoringERC20(geos).safeSymbol();
        decimals[0] = IBoringERC20(geos).safeDecimals();

        uint256 total = 1000;
        uint256 lpPercent = total -
            teamPercent -
            treasuryPercent -
            investorPercent;

        rewardsPerSec[0] =
            (pool.allocPoint * geosPerSec * lpPercent) /
            totalAllocPoint /
            total;

    }

    // View function to see if user can harvest Geos.
    function canHarvest(uint256 _pid, address _user)
        public
        view
        validatePoolByPid(_pid)
        returns (bool)
    {
        UserInfo storage user = userInfo[_pid][_user];
        return
            block.timestamp >= startTimestamp &&
            block.timestamp >= user.nextHarvestUntil;
    }

    // Update reward vairables for all pools. Be careful of gas spending!
    function massUpdatePools() external nonReentrant {
        _massUpdatePools();
    }

    // Internal method for massUpdatePools
    function _massUpdatePools() internal {
        for (uint256 pid = 0; pid < poolInfo.length; ++pid) {
            _updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) external nonReentrant {
        _updatePool(_pid);
    }

    // Internal method for _updatePool
    function _updatePool(uint256 _pid) internal validatePoolByPid(_pid) {
        PoolInfo storage pool = poolInfo[_pid];

        if (block.timestamp <= pool.lastRewardTimestamp) {
            return;
        }

        uint256 lpSupply = pool.totalLp;

        if (lpSupply == 0 || pool.allocPoint == 0) {
            pool.lastRewardTimestamp = block.timestamp;
            return;
        }

        uint256 multiplier = block.timestamp - pool.lastRewardTimestamp;

        uint256 geosReward = ((multiplier * geosPerSec) * pool.allocPoint) / totalAllocPoint;

        uint256 total = 1000;
        uint256 lpPercent = total -
            teamPercent -
            treasuryPercent -
            investorPercent;

        geos.mint(teamAddress,     (geosReward * teamPercent)     / total);
        geos.mint(treasuryAddress, (geosReward * treasuryPercent) / total);
        geos.mint(investorAddress, (geosReward * investorPercent) / total);
        geos.mint(address(this),   (geosReward * lpPercent)       / total);

        mintedGeos += geosReward;

        pool.accGeosPerShare +=
            (geosReward * ACC_TOKEN_PRECISION * lpPercent) /
            pool.totalLp / total;

        pool.lastRewardTimestamp = block.timestamp;

        emit UpdatePool(
            _pid,
            pool.lastRewardTimestamp,
            lpSupply,
            pool.accGeosPerShare
        );
    }

    // function depositWithPermit(
    //     uint256 pid,
    //     uint256 amount,
    //     uint256 deadline,
    //     uint8 v,
    //     bytes32 r,
    //     bytes32 s
    // ) public nonReentrant validatePoolByPid(pid) {
    //     PoolInfo storage pool = poolInfo[pid];
    //     IGeosPair pair = IGeosPair(address(pool.lpToken));
    //     pair.permit(msg.sender, address(this), amount, deadline, v, r, s);
    //     _deposit(pid, amount);
    // }

    // Deposit tokens for Geos allocation.
    function deposit(uint256 _pid, uint256 _amount) public nonReentrant {
        _deposit(_pid, _amount);
    }

    // Deposit tokens for Geos allocation.
    function _deposit(uint256 _pid, uint256 _amount)
        internal
        validatePoolByPid(_pid)
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        _updatePool(_pid);

        payOrLockupPendingGeos(_pid);

        if (_amount > 0) {
            uint256 beforeDeposit = pool.lpToken.balanceOf(address(this));
            pool.lpToken.safeTransferFrom(msg.sender, address(this), _amount);
            uint256 afterDeposit = pool.lpToken.balanceOf(address(this));

            // @TODO:
            // console.log("Deposit amount:", _amount);

            _amount = afterDeposit - beforeDeposit;

            // if (pool.depositFeeBP > 0) {
            //     uint256 depositFee = (_amount * pool.depositFeeBP) / 10000;
            //     pool.lpToken.safeTransfer(treasuryAddress, depositFee);

            //     _amount = _amount - depositFee;
            // }

            // @TODO:
            // console.log("Deposit amount:", _amount);

            user.amount += _amount;

            if (address(pool.lpToken) == address(geos)) {
                totalGeosInPools += _amount;
            }
        }
        user.rewardDebt =
            (user.amount * pool.accGeosPerShare) / ACC_TOKEN_PRECISION;

        if (_amount > 0) {
            pool.totalLp += _amount;
        }

        emit Deposit(msg.sender, _pid, _amount);
    }

    //withdraw tokens
    function withdraw(uint256 _pid, uint256 _amount)
        public
        nonReentrant
        validatePoolByPid(_pid)
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        //this will make sure that user can only withdraw from his pool
        require(user.amount >= _amount, "withdraw: user amount not enough");

        //cannot withdraw more than pool's balance
        require(pool.totalLp >= _amount, "withdraw: pool total not enough");

        _updatePool(_pid);

        payOrLockupPendingGeos(_pid);

        if (_amount > 0) {
            user.amount -= _amount;
            if (address(pool.lpToken) == address(geos)) {
                totalGeosInPools -= _amount;
            }
            pool.lpToken.safeTransfer(msg.sender, _amount);
        }

        user.rewardDebt =
            (user.amount * pool.accGeosPerShare) / ACC_TOKEN_PRECISION;

        if (_amount > 0) {
            pool.totalLp -= _amount;
        }

        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        uint256 amount = user.amount;

        //Cannot withdraw more than pool's balance
        require(
            pool.totalLp >= amount,
            "emergency withdraw: pool total not enough"
        );

        user.amount = 0;
        user.rewardDebt = 0;
        user.rewardLockedUp = 0;
        user.nextHarvestUntil = 0;
        pool.totalLp -= amount;

        if (address(pool.lpToken) == address(geos)) {
            totalGeosInPools -= amount;
        }

        pool.lpToken.safeTransfer(msg.sender, amount);

        emit EmergencyWithdraw(msg.sender, _pid, amount);
    }

    // Pay or lockup pending Geos.
    function payOrLockupPendingGeos(uint256 _pid) internal {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        if (user.nextHarvestUntil == 0 && block.timestamp >= startTimestamp) {
            user.nextHarvestUntil = block.timestamp + pool.harvestInterval;
        }

        uint256 pending = ((user.amount * pool.accGeosPerShare) /
            ACC_TOKEN_PRECISION) - user.rewardDebt;

        if (canHarvest(_pid, msg.sender)) {
            if (pending > 0 || user.rewardLockedUp > 0) {
                uint256 pendingRewards = pending + user.rewardLockedUp;

                // reset lockup
                totalLockedUpRewards -= user.rewardLockedUp;
                user.rewardLockedUp = 0;
                user.nextHarvestUntil = block.timestamp + pool.harvestInterval;

                // send rewards
                safeGeosTransfer(msg.sender, pendingRewards);
            }
        } else if (pending > 0) {
            totalLockedUpRewards += pending;
            user.rewardLockedUp += pending;
            emit RewardLockedUp(msg.sender, _pid, pending);
        }
    }

    // Safe Geos transfer function, just in case if rounding error causes pool do not have enough Geos.
    function safeGeosTransfer(address _to, uint256 _amount) internal {
        if (geos.balanceOf(address(this)) > totalGeosInPools) {
            //geosBal = total Geos in GeosDistributor - total Geos in Geos pools, this will make sure that GeosDistributor never transfer rewards from deposited Geos pools
            uint256 geosBal = geos.balanceOf(address(this)) -
                totalGeosInPools;
            if (_amount >= geosBal) {
                geos.safeTransfer(_to, geosBal);
            } else if (_amount > 0) {
                geos.safeTransfer(_to, _amount);
            }
        }
    }

    function updateEmissionRate(uint256 _geosPerSec) public onlyOwner {
        _massUpdatePools();

        emit EmissionRateUpdated(msg.sender, geosPerSec, _geosPerSec);

        geosPerSec = _geosPerSec;
    }

    function updateAllocPoint(uint256 _pid, uint256 _allocPoint)
        public
        onlyOwner
    {
        _massUpdatePools();

        emit AllocPointsUpdated(
            msg.sender,
            poolInfo[_pid].allocPoint,
            _allocPoint
        );

        totalAllocPoint =
            totalAllocPoint -
            poolInfo[_pid].allocPoint +
            _allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    function poolTotalLp(uint256 pid) external view returns (uint256) {
        return poolInfo[pid].totalLp;
    }

    // Function to harvest many pools in a single transaction
    function harvestMany(uint256[] calldata _pids) public nonReentrant {
        require(_pids.length <= 30, "harvest many: too many pool ids");
        for (uint256 index = 0; index < _pids.length; ++index) {
            _deposit(_pids[index], 0);
        }
    }

    // Update team address by the previous team address.
    function setTeamAddress(address _teamAddress) public {
        require(
            msg.sender == teamAddress,
            "set team address: only previous team address can call this method"
        );
        require(
            _teamAddress != address(0),
            "set team address: invalid new team address"
        );
        teamAddress = _teamAddress;
        emit SetTeamAddress(msg.sender, _teamAddress);
    }

    function setTeamPercent(uint256 _newTeamPercent) public onlyOwner {
        require(
            _newTeamPercent <= 1000,
            "set team percent: invalid percent value"
        );
        require(
            treasuryPercent + _newTeamPercent + investorPercent <= 1000,
            "set team percent: total percent over max"
        );
        emit SetTeamPercent(teamPercent, _newTeamPercent);
        teamPercent = _newTeamPercent;
    }

    // Update treasury address by the previous treasury.
    function setTreasuryAddress(address _treasuryAddress) public {
        require(
            msg.sender == treasuryAddress,
            "set treasury address: only previous treasury address can call this method"
        );
        require(
            _treasuryAddress != address(0),
            "set treasury address: invalid new treasury address"
        );
        treasuryAddress = _treasuryAddress;
        emit SetTreasuryAddress(msg.sender, _treasuryAddress);
    }

    function setTreasuryPercent(uint256 _newTreasuryPercent) public onlyOwner {
        require(
            _newTreasuryPercent <= 1000,
            "set treasury percent: invalid percent value"
        );
        require(
            teamPercent + _newTreasuryPercent + investorPercent <= 1000,
            "set treasury percent: total percent over max"
        );
        emit SetTreasuryPercent(treasuryPercent, _newTreasuryPercent);
        treasuryPercent = _newTreasuryPercent;
    }

    // Update the investor address by the previous investor.
    function setInvestorAddress(address _investorAddress) public {
        require(
            msg.sender == investorAddress,
            "set investor address: only previous investor can call this method"
        );
        require(
            _investorAddress != address(0),
            "set investor address: invalid new investor address"
        );
        investorAddress = _investorAddress;
        emit SetInvestorAddress(msg.sender, _investorAddress);
    }

    function setInvestorPercent(uint256 _newInvestorPercent) public onlyOwner {
        require(
            _newInvestorPercent <= 1000,
            "set investor percent: invalid percent value"
        );
        require(
            teamPercent + _newInvestorPercent + treasuryPercent <= 1000,
            "set investor percent: total percent over max"
        );
        emit SetInvestorPercent(investorPercent, _newInvestorPercent);
        investorPercent = _newInvestorPercent;
    }
}