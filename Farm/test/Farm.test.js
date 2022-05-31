const { expect } = require("chai");

function poolInfoLoger(poolinfo) {
  console.log("----------------------POOLINFO-------------------------");
  console.log("lpToken", poolinfo[0].toString());
  console.log("allocPoint", poolinfo[1].toString());
  console.log("lastRewardBlock", poolinfo[2].toString());
  console.log("accGeosPerShare", poolinfo[3].toString());
  console.log("totalLp", poolinfo[4].toString());
  console.log("------------------------------------------------------");
}

describe("Token contract", () => {
  let GeosToken, geosToken, Farm, farm, minter, alice, bob, carol;
  let ERC20Mock, lp, lp2;

  beforeEach(async () => {
    // "ethers" inject automatically by hardhat
    [minter, alice, bob, carol, _] = await ethers.getSigners();

    GeosToken = await ethers.getContractFactory("GeosSwapToken");
    geosToken = await GeosToken.deploy();

    ERC20Mock = await ethers.getContractFactory("MockERC20");

    lp = await ERC20Mock.deploy("LPToken1", "LP1", "10000000000");
    await lp.transfer(alice.address, "1000");
    await lp.transfer(bob.address, "1000");
    await lp.transfer(carol.address, "1000");

    lp2 = await ERC20Mock.deploy("LPToken2", "LP2", "10000000000");
    await lp2.transfer(alice.address, "1000");
    await lp2.transfer(bob.address, "1000");
    await lp2.transfer(carol.address, "1000");

    Farm = await ethers.getContractFactory("GeosFarm");
    farm = await Farm.deploy(geosToken.address, 10, 0, 0);
  });

  describe("Deployment", () => {
    it("should check initial values", async () => {
      const totalGeos = await farm.totalGeos.call();
      console.log("totalGeos", totalGeos.toString());

      const mintedGeos = await farm.mintedGeos.call();
      console.log("mintedGeos", mintedGeos.toString());

      const geosPerBlock = await farm.geosPerBlock.call();
      console.log("geosPerBlock", geosPerBlock.toString());

      const startBlock = await farm.startBlock.call();
      console.log("startBlock", startBlock.toString());

      const burnAddress = await farm.burnAddress.call();
      console.log("burnAddress", burnAddress);

      const totalAllocPoint = await farm.totalAllocPoint.call();
      console.log("totalAllocPoint", totalAllocPoint.toString());

      const geos = await farm.geos.call();
      console.log("geos", geos);
      console.log("token", geosToken.address);

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
      await farm.add(10, geosToken.address, true);

      const poolLength = await farm.poolLength();
      expect(poolLength).to.equal(1n);

      const poolInfo = await farm.poolInfo(0);
      poolInfoLoger(poolInfo);
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



// await farm.add("100", lp.address,[]);
// await lp.connect(alice).approve(farm.address, "1000", {
//                 from:alice.address,
//             });
// await lp.connect(bob).approve(farm.address, "1000", {
//                 from:bob.address,
//             });
// await lp.connect(this.carol).approve(farm.address, "1000", {
//                 from:carol.address,


// await advanceTimeAndBlock(1); // t+9, b=22
// await farm.connect(alice).deposit(0, "10", { from: alice.address }); // t+10, b=23
//             // Bob deposits 20 LPs at t+14
// await advanceTimeAndBlock(3); // t+13, b=24
// await farm.connect(bob).deposit(0, "20", , { from: bob.address }); // t+14, b=25
//             // Carol deposits 30 LPs at block t+18
// await advanceTimeAndBlock(3); // t+17, b=26
// await farmconnect(carol).deposit(0, "30", { from: carol.address }); // t+18, b=27