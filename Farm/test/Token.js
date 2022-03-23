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
      await token.add(addr1, 100, true);
    });

    xit("should transfer tokens between accounts", async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    xit("should fail if sender doesn't have enough tokens", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Insufficient balance");

      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    xit("should update balances after trasfers", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await token.transfer(addr1.address, 100);
      await token.transfer(addr2.address, 50);

      const finalOwnerBalance = await token.balanceOf(owner.address);

      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 100 - 50);

      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
