// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./interfaces/ILiquidityValueCalculator.sol";
import "./libraries/GeosLibrary.sol";
import "./interfaces/IGeosPair.sol";

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    address public factory;

    constructor(address factory_) public {
        factory = factory_;
    }

    function pairInfo(address tokenA, address tokenB)
        external
        view
        returns (
            uint256 reserveA,
            uint256 reserveB,
            uint256 totalSupply
        )
    {
        IGeosPair pair = IGeosPair(
            GeosLibrary.pairFor(factory, tokenA, tokenB)
        );
        totalSupply = pair.totalSupply();
        (uint256 reserves0, uint256 reserves1, ) = pair.getReserves();
        (reserveA, reserveB) = tokenA == pair.token0()
            ? (reserves0, reserves1)
            : (reserves1, reserves0);
    }

    function computeLiquidityShareValue(
        uint256 liquidity,
        address tokenA,
        address tokenB
    ) external override returns (uint256 tokenAAmount, uint256 tokenBAmount) {
        revert("TODO");
    }

    // function name() external view returns (string) {
    //     return "test";
    // }
}
