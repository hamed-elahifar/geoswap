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

  // Deploy Factory
  const factory = await ethers.getContractFactory("UniswapV2Factory");
  const factoryInstance = await factory.deploy(deployerAddress);
  await factoryInstance.deployed();

  console.log(`Factory deployed to : ${factoryInstance.address}`);

  // Deploy Router passing Factory Address and WETH Address
  const router = await ethers.getContractFactory("UniswapV2Router02");
  const routerInstance = await router.deploy(
    factoryInstance.address,
    wethInstance.address
  );
  await routerInstance.deployed();

  console.log(`Router V02 deployed to :  ${routerInstance.address}`);

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
