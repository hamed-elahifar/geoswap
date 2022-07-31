const { ethers } = require("hardhat");
const fs = require("fs");

async function deploy() {
  const [account] = await ethers.getSigners();
  const deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  // Deploy WETH
  const weth = await ethers.getContractFactory("WETH");
  const wethInstance = await weth.deploy();
  await wethInstance.deployed();

  console.log(`WETH deployed to : ${wethInstance.address}`);

  const wethData = {
    address: wethInstance.address,
    abi: JSON.parse(wethInstance.interface.format("json")),
  };

  fs.writeFileSync("abi/WETH.json", JSON.stringify(wethData, null, 2));

  // Deploy Factory
  const factory = await ethers.getContractFactory("GeosFactory");
  const factoryInstance = await factory.deploy(deployerAddress);
  await factoryInstance.deployed();

  console.log(`Factory deployed to : ${factoryInstance.address}`);

  const factoryData = {
    address: factoryInstance.address,
    abi: JSON.parse(factoryInstance.interface.format("json")),
  };

  fs.writeFileSync("abi/factory.json", JSON.stringify(factoryData, null, 2));

  // Deploy Router passing Factory Address and WETH Address
  const router = await ethers.getContractFactory("Router02");
  const routerInstance = await router.deploy(
    factoryInstance.address,
    wethInstance.address
  );
  await routerInstance.deployed();

  console.log(`Router V02 deployed to :  ${routerInstance.address}`);

  const routerData = {
    address: routerInstance.address,
    abi: JSON.parse(routerInstance.interface.format("json")),
  };

  fs.writeFileSync("abi/router.json", JSON.stringify(routerData, null, 2));

  // Deploy Multicall V2
  const Multicall2 = await ethers.getContractFactory("Multicall2");
  const multicall2 = await Multicall2.deploy();
  console.log("Multicall v2 address:", multicall2.address);

  const multicall2Data = {
    address: multicall2.address,
    abi: JSON.parse(multicall2.interface.format("json")),
  };

  fs.writeFileSync(
    "abi/Multicall2.json",
    JSON.stringify(multicall2Data, null, 2)
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
