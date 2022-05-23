pragma solidity ^0.6.12;

interface ILiquidityValueCalculator {
    function computeLiquidityShareValue(
        uint256 liquidity,
        address tokenA,
        address tokenB
    ) external returns (uint256 tokenAAmount, uint256 tokenBAmount);
}
