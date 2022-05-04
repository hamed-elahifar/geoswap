const { expect } = require("chai");

describe("Token contract", () => {
  let Token, token, Farm, farm, owner, addr1, addr2;

  const maxSupply = 100_000_000_000_000_000_000_000_000n;
  const initialSupply = 10_000_000_000_000_000_000_000_000n;

  beforeEach(async () => {
    // "ethers" inject automatically by hardhat
    Token = await ethers.getContractFactory("GeosSwapToken");
    token = await Token.deploy();

    Farm = await ethers.getContractFactory("GeosFarm");
    farm = await Farm.deploy(token.address, 10, 10, 0);
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("should check initial values", async () => {
      const totalGeos = await farm.totalGeos.call();
      console.log("totalGeos", totalGeos);

      const mintedGeos = await farm.mintedGeos.call();
      console.log("mintedGeos", mintedGeos);

      const geosPerBlock = await farm.geosPerBlock.call();
      console.log("geosPerBlock", geosPerBlock);

      const startBlock = await farm.startBlock.call();
      console.log("startBlock", startBlock);

      const burnAddress = await farm.burnAddress.call();
      console.log("burnAddress", burnAddress);

      const totalAllocPoint = await farm.totalAllocPoint.call();
      console.log("totalAllocPoint", totalAllocPoint);

      const geos = await farm.geos.call();
      console.log("geos", geos);
      console.log("token", token.address);

      // const userInfo = await farm.userInfo.call(0);
      // console.log("userInfo", userInfo);
    });

    it("should setEmissionRate", async () => {
      await farm.setEmissionRate(20);

      const geosPerBlock = await farm.geosPerBlock.call();
      expect(geosPerBlock).to.equal(20n);
    });

    it("should setTotalGeos", async () => {
      await farm.setTotalGeos(20);

      const totalGeos = await farm.totalGeos.call();
      expect(totalGeos).to.equal(20n);
    });

    it("should add pool", async () => {
      await farm.add(10, token.address, true);

      const poolLength = await farm.poolLength();
      expect(poolLength).to.equal(1n);

      const poolInfo = await farm.poolInfo(0);
      console.log("poolInfo", poolInfo);
    });

    it("should calculate", async () => {
      const calculate = await farm.calculate(1000);

      console.log("calculate", calculate.toString());
    });
  });

  describe("Tranactions", () => {
    // it("should add new pool", async () => {
    //   await token.add(1, 100, true);
    // });
  });
});
