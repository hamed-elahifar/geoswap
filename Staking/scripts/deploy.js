const { ethers } = require("hardhat");
const fs = require("fs");
require('dotenv').config();

// Deploy function
async function deploy() {
  const [account] = await ethers.getSigners();
  const deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  // =============================== Staking ================================================
  const TokenFarm = await ethers.getContractFactory("TokenFarm");
  console.log("FARM_REWARD_HOLDER", process.env.FARM_REWARD_HOLDER);
  const tokenFarm = await TokenFarm.deploy(process.env.FARM_REWARD_HOLDER);
  console.log("Token Farm address:", tokenFarm.address);

  const tokenFarmData = {
    address: tokenFarm.address,
    abi: JSON.parse(tokenFarm.interface.format("json")),
  };

  fs.writeFileSync(
    "abi/token-farm.json",
    JSON.stringify(tokenFarmData, null, 2)
  );

  // =============================== Locker ================================================
  const Locker = await ethers.getContractFactory("SolarLocker");
  const locker = await Locker.deploy();
  console.log("Locker address:", locker.address);

  const lockerData = {
    address: locker.address,
    abi: JSON.parse(locker.interface.format("json")),
  };

  fs.writeFileSync(
    "abi/locker.json",
    JSON.stringify(lockerData, null, 2)
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
