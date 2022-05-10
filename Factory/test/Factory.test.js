const { expect } = require("chai");

const { assert } = require("chai");

describe("Token contract", () => {
  let Factory, Router02, TokenA, TokenB, TokenC, WETH;
  let factory, router02, tokenA, tokenB, tokenC, weth;

  before(async () => {
    // "ethers" inject automatically by hardhat
    [owner1, owner2, addr2, _] = await ethers.getSigners();

    Factory = await ethers.getContractFactory("SolarFactory");
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
      console.log("A,B => pair(0)", pair);
    });

    it("createPair should create a new pair A,C", async () => {
      await factory.createPair(tokenA.address, tokenC.address);
      const allPairsLength = await factory.allPairsLength();
      assert.equal(allPairsLength, 2);

      const pair = await factory.allPairs(1);
      console.log("A,C => pair(0)", pair);
    });

    it("should set fee to owner2", async () => {
      await factory.setFeeTo(owner1.address);
      const feeTo = await factory.feeTo();
      assert.equal(feeTo, owner1.address);
    });

    it("should get Migrator", async () => {
      await factory.setMigrator(owner1.address);
      const migrator = await factory.migrator();

      console.log("owner1", owner1.address);

      console.log("migrator", migrator);

      // assert.equal(migrator, owner1.address);
    });

    it("should set 'setFeeToSetter' to owner2", async () => {
      await factory.setFeeToSetter(owner1.address);
      const setFeeToSetter = await factory.feeToSetter();
      assert.equal(setFeeToSetter, owner1.address);
    });

    it("should add addLiquidity", async () => {
      const amoutA = await tokenA.balanceOf(owner1.address);
      const amoutB = await tokenB.balanceOf(owner1.address);
      const amoutC = await tokenC.balanceOf(owner1.address);

      console.log("amoutA", amoutA.toString());
      console.log("amoutB", amoutB.toString());
      console.log("amoutC", amoutC.toString());

      await factory.createPair(tokenB.address, tokenC.address);

      const amout = amoutA;

      await tokenA.approve(router02.address, amout);
      await tokenB.approve(router02.address, amout);
      await tokenC.approve(router02.address, amout);

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

      assert.equal(allowanceA.toString(), amout.toString());
      assert.equal(allowanceB.toString(), amout.toString());
      assert.equal(allowanceC.toString(), amout.toString());

      // await factory.setMigrator(owner1.address);
      // const migrator = await factory.migrator();

      await router02.addLiquidity(
        tokenA.address,
        tokenB.address,
        1000000,
        1000000,
        100,
        100,
        owner1.address,
        Math.floor(Date.now() / 1000) + 60 * 10
      );
    });

    it("should add addLiquidity", async () => {
      const amoutA = await tokenA.balanceOf(owner1.address);
      const amoutB = await tokenB.balanceOf(owner1.address);
      const amoutC = await tokenC.balanceOf(owner1.address);

      console.log("amoutA", amoutA.toString());
      console.log("amoutB", amoutB.toString());
      console.log("amoutC", amoutC.toString());

      const allPairsLength = await factory.allPairsLength();
      console.log("allPairsLength", allPairsLength.toString());

      const pair3Address = await factory.allPairs(2);
      console.log("Pair-3", pair3Address);

      // const pair3 = new ethers.Contract(pair3Address, ERC20ABI, owner1);
      // LpBalance = await pair3.balanceOf(owner1.address);

      // console.log("LpBalance", LpBalance.toString());
    });

    it("should swap 500000 from A to B", async () => {
      await router02.swapExactTokensForTokens(
        tokenA.address,
        tokenB.address,
        500000
      );

      const amoutA = await tokenA.balanceOf(owner1.address);
      const amoutB = await tokenB.balanceOf(owner1.address);
      const amoutC = await tokenC.balanceOf(owner1.address);

      console.log("amoutA", amoutA.toString());
      console.log("amoutB", amoutB.toString());
      console.log("amoutC", amoutC.toString());
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
