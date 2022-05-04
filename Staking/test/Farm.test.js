const { expect } = require("chai");

describe("Token contract", () => {
  let TokenFarm, tokenFarm, owner, addr1, addr2;

  beforeEach(async () => {
    // "ethers" inject automatically by hardhat
    Token = await ethers.getContractFactory("GeosSwapToken");
    token = await Token.deploy();

    Farm = await ethers.getContractFactory("GeosFarm");
    farm = await Farm.deploy(token.address, 10, 10, 10);

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

      // const userInfo = await farm.userInfo.call();
      // console.log("userInfo", userInfo);

      // const poolInfo = await farm.poolInfo.call();
      // console.log("poolInfo", poolInfo);
    });
  });

  describe("Tranactions", () => {
    // it("should add new pool", async () => {
    //   await token.add(1, 100, true);
    // });
  });
});
