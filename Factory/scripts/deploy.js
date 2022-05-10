const { ethers } = require("hardhat");
const fs = require("fs");

async function deploy() {
  const CalHash = await ethers.getContractFactory("CalHash");
  const calHash = await CalHash.deploy();
  await calHash.deployed();

  console.log(calHash.address)
}