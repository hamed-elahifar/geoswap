// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./GEOS-Token.sol";
import "./TransferHelper.sol";

import "hardhat/console.sol";

contract GeosFarm is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 totalLp;
    }

    struct PoolInfo {
        IERC20 lpToken;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accGeosPerShare;
        uint256 totalLp;
    }

    GeosSwapToken public geos;

    address public constant burnAddress =
        address(0x000000000000000000000000000000000000dEaD);

    // uint256 public totalGeos;
    uint256 public mintedGeos;
    uint256 public geosPerBlock;

    PoolInfo[] public poolInfo;

    mapping(address => uint256) poolIndex;

    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    uint256 public totalAllocPoint = 0;
    uint256 public startBlock;

    uint256 public totalGeosInPools = 0;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(
        address indexed user,
        uint256 indexed pid,
        uint256 amount
    );
    event SetEmissionRate(uint256 geosPerBlock);
    // event SetTotalGeos(uint256 totalGeos);
    event AddPool(uint256 allocPoint, address lpToken, bool withUpdate);
    event SetPool(uint256 indexed pid, uint256 allocPoint, bool withUpdate);

    constructor(
        GeosSwapToken _geos,
        uint256 _geosPerBlock,
        uint256 _startBlock
        // uint256 _totalGeos
    ) public {
        // require(_totalGeos <= _geos.maxSupply(), "BAD TOTALAMOUNT");
        geos = _geos;
        geosPerBlock = _geosPerBlock;
        // startBlock = _startBlock;
        startBlock = block.number;
        // totalGeos = _totalGeos;

        // console.log("totalGeos is %s", totalGeos);
    }

    function setEmissionRate(uint256 _geosPerBlock) external onlyOwner {
        massUpdatePools();
        geosPerBlock = _geosPerBlock;

        emit SetEmissionRate(_geosPerBlock);
    }

    // function setTotalGeos(uint256 _totalGeos) external onlyOwner {
    //     massUpdatePools();
    //     require(_totalGeos <= geos.maxSupply(), "setTotalGeos: BAD totalGeos");
    //     require(_totalGeos >= mintedGeos, "setTotalGeos: BAD totalGeos");
    //     totalGeos = _totalGeos;

    //     emit SetTotalGeos(_totalGeos);
    // }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

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
                accGeosPerShare: 0,
                totalLp: 0
            })
        );
        poolIndex[address(_lpToken)] = poolInfo.length;
        emit AddPool(_allocPoint, address(_lpToken), _withUpdate);
    }

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

    function getBlockCount(uint256 _from, uint256 _to)
        public
        pure
        returns (uint256)
    {
        return _to.sub(_from);
    }

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

        farmGeos = maxCanMint > 0 ? _reward : 0;

        // uint256 currTotalGeos = totalGeos;
        // uint256 currMintedGeos = mintedGeos;
        // uint256 maxCanMintByChef = currTotalGeos.sub(currMintedGeos);

        // maxCanMintByChef = maxCanMint > maxCanMintByChef
        //     ? maxCanMintByChef
        //     : maxCanMint;

        // farmGeos = maxCanMintByChef > _reward ? _reward : maxCanMintByChef;
    }

    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

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

    function deposit(uint256 _pid, uint256 _amount) public {
        // require(_pid != 0, "deposit GEOS by staking");
        require(_pid < poolInfo.length, "deposit: BAD POOL");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);

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

            if (address(pool.lpToken) == address(geos)) {
                totalGeosInPools = totalGeosInPools.add(_amount);
            }
        }
        user.rewardDebt = user.amount.mul(pool.accGeosPerShare).div(1e12);
        pool.totalLp = pool.totalLp.add(_amount);
        emit Deposit(msg.sender, _pid, _amount);
    }

    function withdraw(uint256 _pid, uint256 _amount) public {
        require(_pid != 0, "withdraw GEOS by unstaking");
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        require(pool.totalLp >= _amount, "Withdraw: pool total is not enough");

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

            if (address(pool.lpToken) == address(geos)) {
                totalGeosInPools = totalGeosInPools.sub(_amount);
            }
        }
        user.rewardDebt = user.amount.mul(pool.accGeosPerShare).div(1e12);
        pool.totalLp = pool.totalLp.sub(_amount);
        emit Withdraw(msg.sender, _pid, _amount);
    }

    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        if (address(pool.lpToken) == address(geos)) {
            totalGeosInPools = totalGeosInPools.sub(user.amount);
        }

        pool.lpToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _pid, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    // function safeGeosTransfer(address _to, uint256 _amount) public internal {
    //     uint256 geosBal = geos.balanceOf(address(this));
    //     if (_amount > geosBal) {
    //         geos.transfer(_to, geosBal);
    //     } else {
    //         geos.transfer(_to, _amount);
    //     }
    // }

    function safeGeosTransfer(address _to, uint256 _amount) internal {
        //SolarBal = total geos in SolarDistributor - total geos in Geos pools, this will make sure that GeosDistributor never transfer rewards from deposited Goes pools
        uint256 GeosBal = geos.balanceOf(address(this)).sub(totalGeosInPools);

        console.log("+", GeosBal);
        console.log("Amount", _amount);

        if (_amount >= GeosBal) {
            geos.transfer(_to, GeosBal);
        } else if (_amount > 0) {
            geos.transfer(_to, _amount);
        }

        // if (geos.balanceOf(address(this)) > totalGeosInPools) {}
    }
}
