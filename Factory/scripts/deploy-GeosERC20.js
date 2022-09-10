const path = require("path");
const configFile = path.resolve(
  process.cwd(),
  "..",
  `.env.${process.env.NODE_ENV}`
);
require("dotenv").config({ path: configFile });

const { ethers } = require("hardhat");
const fs = require("fs");

async function deploy() {
  const [account] = await ethers.getSigners();
  const deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  // Deploy Token
  const Token = await ethers.getContractFactory("GeosERC20");
  const token = await Token.deploy();
  await token.deployed();

  console.log(`Token deployed to : ${token.address}`);

  const tokenData = {
    address: token.address,
    abi: JSON.parse(token.interface.format("json")),
  };

  fs.writeFileSync("abi/token.json", JSON.stringify(tokenData, null, 2));
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
