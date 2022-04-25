const Factory = artifacts.require("SolarFactory");
const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const SolarRouter02 = artifacts.require("SolarRouter02");
const WETH = artifacts.require("WETH");

require("chai").use(require("chai-as-promised")).should();

contract("Factory", ([owner1, owner2]) => {
  let factory,
    tokenA,
    tokenB,
    tokenAAddress,
    tokenBAddress,
    solarRouter02,
    weth;

  before(async () => {
    factory = await Factory.new(owner1);
    tokenA = await TokenA.new();
    tokenB = await TokenB.new();
    weth = await WETH.new();
    solarRouter02 = await SolarRouter02.new(
      await factory.address,
      await weth.address
    );

    tokenAAddress = await tokenA.address;
    tokenBAddress = await tokenB.address;
  });

  describe("deployment", () => {
    it("deploys Factory successfully", async () => {
      const factoryAddress = await factory.address;
      assert.notEqual(factoryAddress, 0x0);
      assert.notEqual(factoryAddress, "");
      assert.notEqual(factoryAddress, null);
      assert.notEqual(factoryAddress, undefined);
    });

    xit("deploys Router successfully", async () => {
      const solarRouter02Address = await solarRouter02.address;
      assert.notEqual(solarRouter02Address, 0x0);
      assert.notEqual(solarRouter02Address, "");
      assert.notEqual(solarRouter02Address, null);
      assert.notEqual(solarRouter02Address, undefined);
    });

    it("allPairsLength lengh should be 0", async () => {
      const allPairsLength = await factory.allPairsLength();
      assert.equal(allPairsLength, 0);
    });

    it("createPair should create a new pair", async () => {
      await factory.createPair(tokenAAddress, tokenBAddress);
      const allPairsLength = await factory.allPairsLength();
      assert.equal(allPairsLength, 1);
    });

    it("should set fee to owner2", async () => {
      await factory.setFeeTo(owner2);
      const feeTo = await factory.feeTo();
      assert.equal(feeTo, owner2);
    });

    it("should set Migrator to owner2", async () => {
      await factory.setMigrator(owner2);
      const migrator = await factory.migrator();
      assert.equal(migrator, owner2);
    });

    it("should set 'setFeeToSetter' to owner2", async () => {
      await factory.setFeeToSetter(owner2);
      const setFeeToSetter = await factory.feeToSetter();
      assert.equal(setFeeToSetter, owner2);
    });
  });
});
