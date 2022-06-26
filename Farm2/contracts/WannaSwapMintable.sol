// SPDX-License-Identifier: MIT

pragma solidity =0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract WannaSwapMintable is Context, Ownable {
    mapping(address => bool) public _minters;
    uint256 public minterLength; // max = 2: WannaFarm, WannaSwapTreasury for Team Battle

    event AddMinter(address indexed user);
    event RemoveMinter(address indexed user);

    constructor() {
        // address msgSender = _msgSender();
    }

    modifier onlyMinter() {
        // require(_minters[_msgSender()], "GEOSSwapMintable: MUST BE MINTER");
        _;
    }

    function addMinter(address _user) external virtual onlyOwner {
        // require(minterLength < 2, "addMinter: EXCEED MAX AMOUNT OF MINTERS");
        require(!_minters[_user], "addMinter: MINTER HAS EXISTED");
        _minters[_user] = true;
        minterLength++;

        emit AddMinter(_user);
    }

    function removeMinter(address _user) external virtual onlyOwner {
        require(_minters[_user], "addMinter: MINTER HAS NOT EXISTED");
        _minters[_user] = false;
        minterLength--;

        emit RemoveMinter(_user);
    }
}
