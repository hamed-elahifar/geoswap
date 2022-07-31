const { expect } = require("chai");

const { assert } = require("chai");
const { ethers } = require("hardhat");

const { advanceTimeAndBlock } = require("./utils");

async function gotForward(time) {
  await network.provider.send("evm_setNextBlockTimestamp", [time]);
  await network.provider.send("evm_mine");
}

const sleep = (ms) => new Promise((_) => setTimeout(_, ms));

describe("Token contract", () => {
  let Factory, Router02, TokenA, TokenB, TokenC, WETH;
  let factory, router02, tokenA, tokenB, tokenC, weth;
  let LiquidityValueCalculator, liquidityValueCalculator;
  let owner1, owner2, addr1, addr2;

  before(async () => {
    // "ethers" inject automatically by hardhat
    [owner1, owner2, , addr1, addr2, _] = await ethers.getSigners();

    Factory = await ethers.getContractFactory("GeosFactory");
    factory = await Factory.deploy(owner1.address);

    TokenA = await ethers.getContractFactory("TokenA");
    tokenA = await TokenA.deploy();

    TokenB = await ethers.getContractFactory("TokenB");
    tokenB = await TokenB.deploy();

    TokenC = await ethers.getContractFactory("TokenC");
    tokenC = await TokenC.deploy();

    WETH = await ethers.getContractFactory("WETH");
    weth = await WETH.deploy();

    Router02 = await ethers.getContractFactory("Router02");
    router02 = await Router02.deploy(factory.address, weth.address);

    LiquidityValueCalculator = await ethers.getContractFactory(
      "LiquidityValueCalculator"
    );
    liquidityValueCalculator = await LiquidityValueCalculator.deploy(
      factory.address
    );
    // console.log("liquidityValueCalculator", liquidityValueCalculator.address);
  });

  describe("Deployment", () => {
    it("deploys Factory successfully", async () => {
      const factoryAddress = factory.address;
      assert.notEqual(factoryAddress, 0x0);
      assert.notEqual(factoryAddress, "");
      assert.notEqual(factoryAddress, null);
      assert.notEqual(factoryAddress, undefined);
    });

    it("deploys Router successfully", async () => {
      const router02Address = router02.address;
      assert.notEqual(router02Address, 0x0);
      assert.notEqual(router02Address, "");
      assert.notEqual(router02Address, null);
      assert.notEqual(router02Address, undefined);
    });

    it("allPairsLength lengh should be 0", async () => {
      const allPairsLength = await factory.allPairsLength();
      assert.equal(allPairsLength, 0);
    });

    it("createPair should create a new pair A,B", async () => {
      await factory.createPair(tokenA.address, tokenB.address);
      const allPairsLength = await factory.allPairsLength();
      assert.equal(allPairsLength, 1);

      const pair = await factory.allPairs(0);
      // console.log("A,B => pair(0)", pair);
    });

    it("createPair should create a new pair B,C", async () => {
      await factory.createPair(tokenB.address, tokenC.address);
      const allPairsLength = await factory.allPairsLength();
      assert.equal(allPairsLength, 2);

      const pair = await factory.allPairs(1);
      // console.log("B,C => pair(0)", pair);
    });

    it("should set fee to owner1", async () => {
      await factory.setFeeTo(owner1.address);
      const feeTo = await factory.feeTo();
      assert.equal(feeTo, owner1.address);
    });

    it("should get Migrator", async () => {
      await factory.setMigrator(owner1.address);
      const migrator = await factory.migrator();

      // console.log("owner1", owner1.address);

      // console.log("migrator", migrator);

      assert.equal(migrator, owner1.address);
    });

    it("should set 'setFeeToSetter' to owner1", async () => {
      await factory.setFeeToSetter(owner1.address);
      const setFeeToSetter = await factory.feeToSetter();
      assert.equal(setFeeToSetter, owner1.address);
    });

    it("should approve and give allowance", async () => {
      const amountA = await tokenA.balanceOf(owner1.address);
      const amountB = await tokenB.balanceOf(owner1.address);
      const amountC = await tokenC.balanceOf(owner1.address);

      // console.log(amountA / 10 ** 18);
      // console.log(amountB / 10 ** 18);
      // console.log(amountC / 10 ** 18);

      await tokenA.approve(router02.address, amountA);
      await tokenB.approve(router02.address, amountB);
      await tokenC.approve(router02.address, amountC);

      const allowanceA = await tokenA.allowance(
        owner1.address,
        router02.address
      );
      const allowanceB = await tokenB.allowance(
        owner1.address,
        router02.address
      );
      const allowanceC = await tokenC.allowance(
        owner1.address,
        router02.address
      );

      assert.equal(allowanceA.toString(), amountA.toString());
      assert.equal(allowanceB.toString(), amountB.toString());
      assert.equal(allowanceC.toString(), amountC.toString());
    });

    it("should add Liquidity to A-B Pair", async () => {
      const amountA = (await tokenA.balanceOf(owner1.address)) / 10 ** 18;
      const amountB = (await tokenB.balanceOf(owner1.address)) / 10 ** 18;

      // console.log(amountA / 10 ** 18);
      // console.log(amountB / 10 ** 18);

      await router02.addLiquidity(
        tokenA.address,
        tokenB.address,
        BigInt(100_000 * 10 ** 18),
        BigInt(100_000 * 10 ** 18),
        100,
        100,
        owner1.address,
        Math.floor(Date.now() / 1000) + 60 * 10
      );

      const amountAafterAddLiquidity =
        (await tokenA.balanceOf(owner1.address)) / 10 ** 18;
      const amountBafterAddLiquidity =
        (await tokenB.balanceOf(owner1.address)) / 10 ** 18;

      console.log(
        "Balance Token A for owner1 after add liquidity",
        amountAafterAddLiquidity
      );
      console.log(
        "Balance Token B for owner1 after add liquidity",
        amountBafterAddLiquidity
      );

      assert.equal(amountA, amountAafterAddLiquidity + 100_000);
      assert.equal(amountB, amountBafterAddLiquidity + 100_000);
    });

    it("should add Liquidity to B-C Pair", async () => {
      const amountB = (await tokenB.balanceOf(owner1.address)) / 10 ** 18;
      const amountC = (await tokenC.balanceOf(owner1.address)) / 10 ** 18;

      // console.log(amountB / 10 ** 18);
      // console.log(amountC / 10 ** 18);

      await router02.addLiquidity(
        tokenB.address,
        tokenC.address,
        BigInt(500_000 * 10 ** 18),
        BigInt(500_000 * 10 ** 18),
        100,
        100,
        owner1.address,
        Math.floor(Date.now() / 1000) + 60 * 10
      );

      const amountBafterAddLiquidity =
        (await tokenB.balanceOf(owner1.address)) / 10 ** 18;
      const amountCafterAddLiquidity =
        (await tokenC.balanceOf(owner1.address)) / 10 ** 18;

      console.log(
        "Balance Token B for owner1 after add liquidity",
        amountBafterAddLiquidity
      );
      console.log(
        "Balance Token C for owner1 after add liquidity",
        amountCafterAddLiquidity
      );

      assert.equal(amountB, amountBafterAddLiquidity + 500_000);
      assert.equal(amountC, amountCafterAddLiquidity + 500_000);
    });

    xit("some check after add addLiquidity", async () => {
      console.log();
      console.log("pairInfo A-B");
      const pairInfoAB = await liquidityValueCalculator.pairInfo(
        tokenA.address,
        tokenB.address
      );
      console.log("reserveTokenA", pairInfoAB[0] / 10 ** 18);
      console.log("reserveTokenB", pairInfoAB[1] / 10 ** 18);
      console.log("totalSupply A-B", pairInfoAB[2] / 10 ** 18);

      console.log();
      console.log("pairInfo B-C");

      const pairInfoBC = await liquidityValueCalculator.pairInfo(
        tokenB.address,
        tokenC.address
      );
      console.log("reserveTokenB", pairInfoBC[0] / 10 ** 18);
      console.log("reserveTokenC", pairInfoBC[1] / 10 ** 18);
      console.log("totalSupply B-C", pairInfoBC[2] / 10 ** 18);
    });

    xit("should getPair", async () => {
      const pair = await factory.getPair(tokenA.address, tokenB.address);
      // console.log("pair", pair);
    });

    xit("should trasfter 100_000 token to router", async () => {
      await tokenA.transferFrom(
        owner1.address,
        router02.address,
        BigInt(100_000 * 10 ** 18)
      );
      await tokenB.transferFrom(
        owner1.address,
        router02.address,
        BigInt(100_000 * 10 ** 18)
      );
      await tokenC.transferFrom(
        owner1.address,
        router02.address,
        BigInt(100_000 * 10 ** 18)
      );
    });

    it("should swap from A to B", async () => {
      const balanceAbeforSwap =
        (await tokenA.balanceOf(owner1.address)) / 10 ** 18;
      const balanceBbeforSwap =
        (await tokenB.balanceOf(owner1.address)) / 10 ** 18;

      console.log("Owner1, balanceAbeforSwap", balanceAbeforSwap);
      console.log("Owner1, balanceBbeforSwap", balanceBbeforSwap);

      let pathAB = [tokenA.address, tokenB.address];
      let amountIn = 5 * 1000;
      let amountOutMin = 4 * 1000;

      // SWAP
      await router02.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        pathAB,
        owner1.address,
        Math.floor(Date.now() / 1000) + 60 * 10
      );

      console.log("Advance Time & Block");
      await advanceTimeAndBlock(1);

      const balanceAafterSwap =
        (await tokenA.balanceOf(owner1.address)) / 10 ** 18;
      const balanceBafterSwap =
        (await tokenB.balanceOf(owner1.address)) / 10 ** 18;

      console.log("Owner1, balanceAafterSwap", balanceAafterSwap);
      console.log("Owner1, balanceBafterSwap", balanceBafterSwap);

      console.log();
      console.log(
        "balance A before swap - balance A after swap",
        balanceAbeforSwap - balanceAafterSwap
      );
      console.log(
        "balance B before swap - balance B after swap",
        balanceBbeforSwap - balanceBafterSwap
      );

      console.log(" ~~~~~~ POOL AB After swap ~~~~~~ ");

      const pairInfoAB = await liquidityValueCalculator.pairInfo(
        tokenA.address,
        tokenB.address
      );
      console.log("reserveTokenA", pairInfoAB[0] / 10 ** 18);
      console.log("reserveTokenB", pairInfoAB[1] / 10 ** 18);
      console.log("totalSupply", pairInfoAB[2] / 10 ** 18);
    });

    xit("should swap from B to C", async () => {
      const amountA = await tokenA.balanceOf(owner1.address);
      const amountB = await tokenB.balanceOf(owner1.address);
      const amountC = await tokenC.balanceOf(owner1.address);

      console.log("Owner1, amountA", amountA / 10 ** 18);
      console.log("Owner1, amountB", amountB / 10 ** 18);
      console.log("Owner1, amountC", amountC / 10 ** 18);

      await tokenA.transferFrom(
        owner1.address,
        router02.address,
        BigInt(50 * 10 ** 18)
      );
      await tokenB.transferFrom(
        owner1.address,
        router02.address,
        BigInt(50 * 10 ** 18)
      );

      let pathAB = [tokenA.address, tokenB.address];
      let pathBC = [tokenB.address, tokenC.address];
      let amountIn = 5 * 1000;
      let amountOutMin = 4 * 1000;

      await router02.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        pathAB,
        owner1.address,
        Math.floor(Date.now() / 1000) + 60 * 10
      );

      // await router02.swapExactTokensForTokens(
      //   amountIn,
      //   amountOutMin,
      //   pathBC,
      //   owner1.address,
      //   Math.floor(Date.now() / 1000) + 60 * 10
      // );

      // const amountAA = await tokenA.balanceOf(owner1.address);
      // const amountBB = await tokenB.balanceOf(owner1.address);
      // const amountCC = await tokenC.balanceOf(owner1.address);

      // console.log();
      // console.log("amoutAA", amountAA / 10 ** 18);
      // console.log("amoutBB", amountBB / 10 ** 18);
      // console.log("amoutCC", amountCC / 10 ** 18);
      // console.log();
      // console.log("A - AA", (amountA - amountAA) / 10 ** 18);
      // console.log("B - BB", (amountB - amountBB) / 10 ** 18);
      // console.log("C - CC", (amountC - amountCC) / 10 ** 18);

      // console.log(" ~~~~~~ After swap ~~~~~~ ");

      // console.log("--- A-B ---");

      // const pairInfoAB = await liquidityValueCalculator.pairInfo(
      //   tokenA.address,
      //   tokenB.address
      // );
      // console.log("reserveA", pairInfoAB[0].toString());
      // console.log("reserveB", pairInfoAB[1].toString());
      // console.log("totalSupply", pairInfoAB[2].toString());

      // console.log("--- B-C ---");

      // const pairInfoBC = await liquidityValueCalculator.pairInfo(
      //   tokenA.address,
      //   tokenB.address
      // );
      // console.log("reserveB", pairInfoBC[0].toString());
      // console.log("reserveC", pairInfoBC[1].toString());
      // console.log("totalSupply", pairInfoBC[2].toString());

      // const amountAAA = await tokenA.balanceOf(owner1.address);
      // const amountBBB = await tokenB.balanceOf(owner1.address);
      // const amountCCC = await tokenC.balanceOf(owner1.address);

      // console.log();
      // console.log("amoutAAA", amountAAA / 10 ** 18);
      // console.log("amoutBBB", amountBBB / 10 ** 18);
      // console.log("amoutCCC", amountCCC / 10 ** 18);
      // console.log();
    });

    xit("should check user Balance", async () => {
      // await ethers.advanceTimeAndBlock(1);
      // await ethers.wait();

      // await transaction.wait([(confirms = 1)]);
      await gotForward(new Date().getTime() + 60);

      await network.provider.send("evm_mine");

      const amountA = await tokenA.balanceOf(owner1.address);
      const amountB = await tokenB.balanceOf(owner1.address);
      const amountC = await tokenC.balanceOf(owner1.address);

      console.log();
      console.log("amoutA", amountA / 10 ** 18);
      console.log("amoutB", amountB / 10 ** 18);
      console.log("amoutC", amountC / 10 ** 18);
      console.log();
    });

    xit("should swap 100 from A to C", async () => {
      let pathAC = [tokenA.address, tokenB.address, tokenC.address];
      let amountIn = 2 * 1000;
      let amountOutMin = 1 * 1000;

      await router02.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        pathAC,
        owner1.address,
        Math.floor(Date.now() / 1000) + 60 * 10
      );

      console.log("--- A-B ---");

      const pairInfoAB = await liquidityValueCalculator.pairInfo(
        tokenA.address,
        tokenB.address
      );
      console.log("reserveA", pairInfoAB[0].toString());
      console.log("reserveB", pairInfoAB[1].toString());
      console.log("totalSupply", pairInfoAB[2].toString());

      console.log("--- B-C ---");

      const pairInfoBC = await liquidityValueCalculator.pairInfo(
        tokenA.address,
        tokenB.address
      );
      console.log("reserveB", pairInfoBC[0].toString());
      console.log("reserveC", pairInfoBC[1].toString());
      console.log("totalSupply", pairInfoBC[2].toString());
    });

    xit("should add addLiquidityETH", async () => {
      const amoutA = await tokenA.balanceOf(owner1.address);
      console.log("amoutA", amoutA.toString());

      const amout = amoutA;

      await tokenA.approve(router02.address, amout);

      const allowanceA = await tokenA.allowance(
        owner1.address,
        router02.address
      );

      assert.equal(allowanceA.toString(), amout.toString());

      await router02.addLiquidityETH(
        tokenA.address,
        1000,
        1,
        1000,
        owner1.address,
        Math.floor(Date.now() / 1000) + 60 * 10
        // {
        //   value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
        // }
      );
    });
  });
});
