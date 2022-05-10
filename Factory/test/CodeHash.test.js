const { expect } = require("chai");

const { assert } = require("chai");

describe("Token contract", () => {
  let CalHash, calHash;

  before(async () => {
    // "ethers" inject automatically by hardhat
    [owner1, owner2, addr2, _] = await ethers.getSigners();

    CalHash = await ethers.getContractFactory("CalHash");
    calHash = await CalHash.deploy();
  });

  describe("Deployment", () => {
    it("deploys calHash successfully", async () => {
      const calHashAddress = calHash.address;
      assert.notEqual(calHashAddress, 0x0);
      assert.notEqual(calHashAddress, "");
      assert.notEqual(calHashAddress, null);
      assert.notEqual(calHashAddress, undefined);
    });

    it("should return HASH", async () => {
      const hash = await calHash.getInitHash();
      console.log(hash);
    });
  });
});
