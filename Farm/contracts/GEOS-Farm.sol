pragma solidity ^0.6.12;

// import "./pancake-swap-lib/contracts/math/SafeMath.sol";
// import "./pancake-swap-lib/contracts/token/BEP20/IERC20.sol";
// import "./pancake-swap-lib/contracts/token/BEP20/SafeBEP20.sol";
// import "./pancake-swap-lib/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./GEOS-Token.sol";
import "./TransferHelper.sol";

// import "./SyrupBar.sol";

// import "@nomiclabs/buidler/console.sol";

interface IMigratorChef {
    // Perform LP token migration from legacy PancakeSwap to CakeSwap.
    // Take the current LP token address and return the new LP token address.
    // Migrator should have full access to the caller's LP token.
    // Return the new LP token address.
    //
    // XXX Migrator must have allowance access to PancakeSwap LP tokens.
    // CakeSwap must mint EXACTLY the same amount of CakeSwap LP tokens or
    // else something bad will happen. Traditional PancakeSwap does not
    // do that so be careful!
    function migrate(IERC20 token) external returns (IERC20);
}

// MasterChef is the master of Cake. He can make Cake and he is a fair guy.
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once CAKE is sufficiently
// distributed and the community can show to govern itself.
//
// Have fun reading it. Hopefully it's bug-free. God bless.

contract GeosFarm is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    // using SafeERC20 for WannaSwapToken;

    // Info of each user.
    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 lpToken;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accGeosPerShare;
    }

    // The CAKE TOKEN!
    GeosSwapToken public geos;

    // Burn Address
    address public constant burnAddress =
        address(0x000000000000000000000000000000000000dEaD);

    uint256 public totalGeos;
    uint256 public mintedGeos;
    uint256 public geosPerBlock;

    IMigratorChef public migrator;

    // Info of each pool.
    PoolInfo[] public poolInfo;

    //
    mapping(address => uint256) poolIndex;

    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when CAKE mining starts.
    uint256 public startBlock;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );
    event SetEmissionRate(uint256 geosPerBlock);
    event SetTotalGeos(uint256 totalGeos);
    event AddPool(uint256 allocPoint, address lpToken, bool withUpdate);
    event SetPool(uint256 indexed pid, uint256 allocPoint, bool withUpdate);

    constructor(
        GeosSwapToken _geos,
        uint256 _geosPerBlock,
        uint256 _startBlock,
        uint256 _totalGeos
    ) public {
        require(_totalGeos <= _geos.maxSupply(), "BAD TOTALAMOUNT");
        geos = _geos;
        geosPerBlock = _geosPerBlock;
        startBlock = _startBlock;
        totalGeos = _totalGeos;
    }

    function setEmissionRate(uint256 _geosPerBlock) external onlyOwner {
        massUpdatePools();
        geosPerBlock = _geosPerBlock;

        emit SetEmissionRate(_geosPerBlock);
    }

    function setTotalGeos(uint256 _totalGeos) external onlyOwner {
        massUpdatePools();
        require(_totalGeos <= geos.maxSupply(), "setTotalGeos: BAD totalGeos");
        require(_totalGeos >= mintedGeos, "setTotalGeos: BAD totalGeos");
        totalGeos = _totalGeos;

        emit SetTotalGeos(_totalGeos);
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    // XXX DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function add(
        uint256 _allocPoint,
        IERC20 _lpToken,
        bool _withUpdate
    ) public onlyOwner {
        require(poolIndex[address(_lpToken)] == 0, "addPool: EXISTED POOL");
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock
            ? block.number
            : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                allocPoint: _allocPoint,
                lastRewardBlock: lastRewardBlock,
                accGeosPerShare: 0
            })
        );
        poolIndex[address(_lpToken)] = poolInfo.length;
        emit AddPool(_allocPoint, address(_lpToken), _withUpdate);
    }

    // Update the given pool's CAKE allocation point. Can only be called by the owner.
    function set(
        uint256 _pid,
        uint256 _allocPoint,
        bool _withUpdate
    ) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 prevAllocPoint = poolInfo[_pid].allocPoint;
        poolInfo[_pid].allocPoint = _allocPoint;
        if (prevAllocPoint != _allocPoint) {
            totalAllocPoint = totalAllocPoint.sub(prevAllocPoint).add(
                _allocPoint
            );
        }
        emit SetPool(_pid, _allocPoint, _withUpdate);
    }

    // Set the migrator contract. Can only be called by the owner.
    function setMigrator(IMigratorChef _migrator) public onlyOwner {
        migrator = _migrator;
    }

    // Migrate lp token to another lp contract. Can be called by anyone. We trust that migrator contract is good.
    function migrate(uint256 _pid) public {
        require(address(migrator) != address(0), "migrate: no migrator");
        PoolInfo storage pool = poolInfo[_pid];
        IERC20 lpToken = pool.lpToken;
        uint256 bal = lpToken.balanceOf(address(this));
        lpToken.safeApprove(address(migrator), bal);
        IERC20 newLpToken = migrator.migrate(lpToken);
        require(bal == newLpToken.balanceOf(address(this)), "migrate: bad");
        pool.lpToken = newLpToken;
    }

    function getBlockCount(uint256 _from, uint256 _to)
        public
        view
        returns (uint256)
    {
        return _to.sub(_from);
    }

    // View function to see pending CAKEs on frontend.
    function pendingGeos(uint256 _pid, address _user)
        external
        view
        returns (uint256)
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accGeosPerShare = pool.accGeosPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 blockCount = getBlockCount(
                pool.lastRewardBlock,
                block.number
            );
            uint256 geosReward = blockCount
                .mul(geosPerBlock)
                .mul(pool.allocPoint)
                .div(totalAllocPoint);

            uint256 farmGeos = calculate(geosReward);
            accGeosPerShare = accGeosPerShare.add(
                farmGeos.mul(1e12).div(lpSupply)
            );
        }
        return user.amount.mul(accGeosPerShare).div(1e12).sub(user.rewardDebt);
    }

    function calculate(uint256 _reward) public view returns (uint256 farmGeos) {
        uint256 maxSupply = geos.maxSupply();
        uint256 totalSupply = geos.totalSupply();
        uint256 maxCanMint = maxSupply.sub(totalSupply);

        uint256 currTotalGeos = totalGeos;
        uint256 currMintedGeos = mintedGeos;
        uint256 maxCanMintByChef = currTotalGeos.sub(currMintedGeos);

        maxCanMintByChef = maxCanMint > maxCanMintByChef
            ? maxCanMintByChef
            : maxCanMint;

        farmGeos = maxCanMintByChef > _reward ? _reward : maxCanMintByChef;
    }

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 blockCount = getBlockCount(pool.lastRewardBlock, block.number);
        uint256 geosReward = blockCount
            .mul(geosPerBlock)
            .mul(pool.allocPoint)
            .div(totalAllocPoint);
        uint256 farmGeos = calculate(geosReward);
        geos.mint(address(this), farmGeos);
        mintedGeos = mintedGeos.add(farmGeos);
        pool.accGeosPerShare = pool.accGeosPerShare.add(
            geosReward.mul(1e12).div(lpSupply)
        );
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MasterChef for CAKE allocation.
    function deposit(uint256 _pid, uint256 _amount) public {
        require(_pid != 0, "deposit CAKE by staking");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);

        // harvest(_pid, msg.sender);

        if (user.amount > 0) {
            uint256 pending = user
                .amount
                .mul(pool.accGeosPerShare)
                .div(1e12)
                .sub(user.rewardDebt);
            if (pending > 0) {
                safeGeosTransfer(msg.sender, pending);
            }
        }
        if (_amount > 0) {
            pool.lpToken.safeTransferFrom(
                address(msg.sender),
                address(this),
                _amount
            );
            user.amount = user.amount.add(_amount);
        }
        user.rewardDebt = user.amount.mul(pool.accGeosPerShare).div(1e12);
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _amount) public {
        require(_pid != 0, "withdraw GEOS by unstaking");
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        updatePool(_pid);
        uint256 pending = user.amount.mul(pool.accGeosPerShare).div(1e12).sub(
            user.rewardDebt
        );
        if (pending > 0) {
            safeGeosTransfer(msg.sender, pending);
        }
        if (_amount > 0) {
            user.amount = user.amount.sub(_amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }
        user.rewardDebt = user.amount.mul(pool.accGeosPerShare).div(1e12);
        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        pool.lpToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    // Safe cake transfer function, just in case if rounding error causes pool to not have enough CAKEs.
    function safeGeosTransfer(address _to, uint256 _amount) public onlyOwner {
        uint256 geosBal = geos.balanceOf(address(this));
        if (_amount > geosBal) {
            geos.transfer(_to, geosBal);
        } else {
            geos.transfer(_to, _amount);
        }
    }
}
