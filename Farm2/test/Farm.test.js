const { expect } = require("chai");
const { advanceTimeAndBlock } = require("./utils");

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
  let GeosToken, geosToken, Farm, farm;
  let signers, deployer, bob, carol, dev, treasury, investor, minter, alice;

  let ERC20Mock, lp1, lp2;

  const devPercent = 200;
  const treasuryPercent = 100;
  const investorPercent = 200;
  const lpPercent = 1000 - devPercent - treasuryPercent - investorPercent;
  const secOffset = 1;
  const tokenOffset = 1;
  const geosPerSec = 100;
  const reward = (sec, percent) => (sec * geosPerSec * percent) / 1000;

  before(async () => {
    // "ethers" inject automatically by hardhat
    // [minter, alice, bob, carol, _] = await ethers.getSigners();

    signers = await ethers.getSigners();
    deployer = signers[0];
    bob = signers[1];
    carol = signers[2];
    dev = signers[3];
    treasury = signers[4];
    investor = signers[5];
    minter = signers[6];
    alice = signers[7];

    GeosToken = await ethers.getContractFactory("GeosSwapToken");
    geosToken = await GeosToken.deploy();

    ERC20Mock = await ethers.getContractFactory("MockERC20");

    lp1 = await ERC20Mock.deploy("LPToken1", "LP1", "10000000000");
    await lp1.transfer(alice.address, "1000");
    await lp1.transfer(bob.address, "1000");
    await lp1.transfer(carol.address, "1000");

    lp2 = await ERC20Mock.deploy("LPToken2", "LP2", "10000000000");
    await lp2.transfer(alice.address, "1000");
    await lp2.transfer(bob.address, "1000");
    await lp2.transfer(carol.address, "1000");

    Farm = await ethers.getContractFactory("GeosFarm");
    farm = await Farm.deploy(
      geosToken.address, // GeosSwapToken _geos,
      100, // geosPerBlock,
      0, // startBlock,
      // 0 // totalGeos
    );

    // Add Minter
    // await geosToken.addMinter(deployer.address);
    // await geosToken.addMinter(minter.address);
    // await geosToken.addMinter(alice.address)
    // await geosToken.addMinter(bob.address)
    // await geosToken.addMinter(carol.address)

    await farm.add(100, lp1.address, true);
    await farm.add(100, lp2.address, true);
  });

  describe("Deployment", () => {
    // it("should ")

    it("should check initial values", async () => {
      // const totalGeos = await farm.totalGeos.call();
      // console.log("totalGeos", totalGeos.toString());

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

    xit("should setEmissionRate", async () => {
      await farm.setEmissionRate(20);

      const geosPerBlock = await farm.geosPerBlock.call();
      expect(geosPerBlock).to.equal(20n);
    });

    xit("should setTotalGeos", async () => {
      await farm.setTotalGeos(20);

      const totalGeos = await farm.totalGeos.call();
      expect(totalGeos).to.equal(20n);
    });

    xit("should add LP1", async () => {
      await farm.add(100, lp1.address, true);

      const poolLength = await farm.poolLength();
      expect(poolLength).to.equal(1n);

      const poolInfo = await farm.poolInfo(0);
      poolInfoLoger(poolInfo);
    });

    xit("should add LP2", async () => {
      await farm.add(100, lp2.address, true);

      const poolLength = await farm.poolLength();
      expect(poolLength).to.equal(1n);

      const poolInfo = await farm.poolInfo(0);
      poolInfoLoger(poolInfo);
    });

    xit("should add pool", async () => {
      await farm.add(10, geosToken.address, true);

      const poolLength = await farm.poolLength();
      expect(poolLength).to.equal(3n);

      const poolInfo = await farm.poolInfo(0);
      poolInfoLoger(poolInfo);
    });

    xit("should calculate", async () => {
      const calculate = await farm.calculate(1000);

      console.log("calculate", calculate.toString());
    });

    it("should Do calculation", async () => {
      await lp1.connect(alice).approve(farm.address, "1000", {
        from: alice.address,
      });
      await lp1.connect(bob).approve(farm.address, "1000", {
        from: bob.address,
      });
      await lp1.connect(carol).approve(farm.address, "1000", {
        from: carol.address,
      });

      // Alice deposits 10 LPs at t+10
      await advanceTimeAndBlock(1); // t+9, b=22
      await farm.connect(alice).deposit(0, "10", { from: alice.address }); // t+10, b=23
      // Bob deposits 20 LPs at t+14
      await advanceTimeAndBlock(3); // t+13, b=24
      await farm.connect(bob).deposit(0, "20", /*{ from: bob.address }*/); // t+14, b=25
      // Carol deposits 30 LPs at block t+18
      await advanceTimeAndBlock(3); // t+17, b=26
      await farm.connect(carol).deposit(0, "30", { from: carol.address }); // t+18, b=27

      // Alice deposits 10 more LPs at t+20. At this point:
      //   Alice should have:
      //      - 4*50 + 4*50*1/3 + 2*50*1/6 = 283 (+50) SolarBeamToken
      //   Dev should have: 10*20 = 200 (+20)
      //   Treasury should have: 10*20 = 200 (+10)
      //   Investor should have: 10*10 = 100 (+20)
      //   MasterChef should have: 1000 - 283 - 200 - 200 - 100 = 217 (+100)
      await advanceTimeAndBlock(1); // t+19, b=28
      await farm.connect(alice).deposit(0, "10", { from: alice.address }); // t+20, b=29
      // expect(await geosToken.totalSupply()).to.be.within(1000, 1100);

      // Because LP rewards are divided among participants and rounded down, we account
      // for rounding errors with an offset
      expect(await geosToken.balanceOf(alice.address)).to.be.within(
        283 - tokenOffset,
        333 + tokenOffset
      );

      expect(await geosToken.balanceOf(bob.address)).to.equal("0");

      expect(await geosToken.balanceOf(carol.address)).to.equal("0");

      expect(await geosToken.balanceOf(dev.address)).to.be.within(
        200 - tokenOffset,
        220 + tokenOffset
      );

      expect(await geosToken.balanceOf(treasury.address)).to.be.within(
        100 - tokenOffset,
        110 + tokenOffset
      );

      expect(await geosToken.balanceOf(investor.address)).to.be.within(
        200 - tokenOffset,
        220 + tokenOffset
      );

      expect(await geosToken.balanceOf(farm.address)).to.be.within(
        217 - tokenOffset,
        317 + tokenOffset
      );
      
    });
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
