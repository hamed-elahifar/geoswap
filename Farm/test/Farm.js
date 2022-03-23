const { expect } = require("chai");

describe("Token contract", () => {
  let Token, token, owner, addr1, addr2;

  beforeEach(async () => {
    // "ethers" inject automatically by hardhat
    Token = await ethers.getContractFactory("GeosSwapToken");
    token = await Token.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      console.log("OWNER", await token.owner());

      expect(await token.owner()).to.equal(owner.address);
    });

    it("should assing the total supply of tokens to the owner", async () => {
      const ownerBalance = await token.balanceOf(owner.address);

      console.log("ownerBalance", ownerBalance);

      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Tranactions", () => {
    it("should add new pool", async () => {
      await token.add(1, 100, true);
    });
  });
});
