const path = require("path");
const configFile = path.resolve(
  process.cwd(),
  "..",
  `.env.${process.env.NODE_ENV}`
);
require("dotenv").config({ path: configFile });

const ethers = require("ethers");

const ownerAddress = process.env.OWNER_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const usdcAddress = process.env.USDC;
const usdtAddress = process.env.USDT;
const wethAddress = process.env.WETH;
const daiAddress = process.env.DAI;

const routerAddress = process.env.ROUTER_ADDRESS;
const factoryAddress = process.env.FACTORY_ADDRESS;

const amount = 1000000000000000000000000n;

const provider = new ethers.providers.StaticJsonRpcProvider(
  process.env.PROVIDER_RPC,
  {
    chainId: +process.env.CHAIN_ID,
    name: process.env.PROVIDER_NAME,
  }
);

// Get balance
const getBalance = async () => {
  const ownerBalance = ethers.utils.formatEther(
    await provider.getBalance(ownerAddress)
  );
  console.log(`Owner Balance is: ${ownerBalance} ETH`);
};

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const { abi: usdcABI } = require("../abi/USDC.json");
const { abi: usdtABI } = require("../abi/USDT.json");
const { abi: wethABI } = require("../abi/WETH.json");
const { abi: daiABI } = require("../abi/DAI.json");

const USDC = new ethers.Contract(usdcAddress, usdcABI, wallet);
const USDT = new ethers.Contract(usdtAddress, usdtABI, wallet);
const WETH = new ethers.Contract(wethAddress, wethABI, wallet);
const DAI = new ethers.Contract(daiAddress, daiABI, wallet);

const getInfo = async () => {
  console.log();
  console.log("+++ USDC +++");

  const nameUSDC = await USDC.name();
  console.log(`name is: ${nameUSDC}`);

  const symbolUSDC = await USDC.symbol();
  console.log(`symbol is: ${symbolUSDC}`);

  const decimalsUSDC = await USDC.decimals();
  console.log(`decimals is: ${decimalsUSDC}`);

  const totalSupplyUSDC = await USDC.totalSupply();
  console.log(`totalSupply is: ${totalSupplyUSDC}`);

  const balanceOfUSDC = await USDC.balanceOf(ownerAddress);
  console.log(`balanceOf: ${balanceOfUSDC}`);

  console.log();
  console.log("+++ USDT +++");

  const nameUSDT = await USDT.name();
  console.log(`name is: ${nameUSDT}`);

  const symbolUSDT = await USDT.symbol();
  console.log(`symbol is: ${symbolUSDT}`);

  const decimalsUSDT = await USDT.decimals();
  console.log(`decimals is: ${decimalsUSDT}`);

  const totalSupplyUSDT = await USDT.totalSupply();
  console.log(`totalSupply is: ${totalSupplyUSDT}`);

  const balanceOfUSDT = await USDT.balanceOf(ownerAddress);
  console.log(`balanceOf: ${balanceOfUSDT}`);

  console.log();
  console.log("+++ WETH +++");

  const nameWETH = await WETH.name();
  console.log(`name is: ${nameWETH}`);

  const symbolWETH = await WETH.symbol();
  console.log(`symbol is: ${symbolWETH}`);

  const decimalsWETH = await WETH.decimals();
  console.log(`decimals is: ${decimalsWETH}`);

  const totalSupplyWETH = await WETH.totalSupply();
  console.log(`totalSupply is: ${totalSupplyWETH}`);

  const balanceOfWETH = await WETH.balanceOf(ownerAddress);
  console.log(`balanceOf: ${balanceOfWETH}`);

  console.log();
  console.log("+++ DAI +++");

  const nameDAI = await DAI.name();
  console.log(`name is: ${nameDAI}`);

  const symbolDAI = await DAI.symbol();
  console.log(`symbol is: ${symbolDAI}`);

  const decimalsDAI = await DAI.decimals();
  console.log(`decimals is: ${decimalsDAI}`);

  const totalSupplyDAI = await DAI.totalSupply();
  console.log(`totalSupply is: ${totalSupplyDAI}`);

  const balanceOfDAI = await DAI.balanceOf(ownerAddress);
  console.log(`balanceOf: ${balanceOfDAI}`);

  console.log();
};

const approveUSDC = async () => {
  const createReceipt1 = await USDC.approve(routerAddress, amount);
  await createReceipt1.wait();

  const allowance = await USDC.allowance(ownerAddress, routerAddress);
  console.log(`USDC allowance: ${allowance}`);

  console.log(`Tx successful with hash: ${createReceipt1.hash}`);
};

const approveUSDT = async () => {
  const createReceipt1 = await USDT.approve(routerAddress, amount);
  await createReceipt1.wait();

  const allowance = await USDT.allowance(ownerAddress, routerAddress);
  console.log(`USDT allowance: ${allowance}`);

  console.log(`Tx successful with hash: ${createReceipt1.hash}`);
};

const approveWETH = async () => {
  const createReceipt1 = await WETH.approve(routerAddress, amount);
  await createReceipt1.wait();

  const allowance = await WETH.allowance(ownerAddress, routerAddress);
  console.log(`WETH allowance: ${allowance}`);

  console.log(`Tx successful with hash: ${createReceipt1.hash}`);
};

const approveDAI = async () => {
  const createReceipt1 = await DAI.approve(routerAddress, amount);
  await createReceipt1.wait();

  const allowance = await DAI.allowance(ownerAddress, routerAddress);
  console.log(`DAI allowance: ${allowance}`);

  console.log(`Tx successful with hash: ${createReceipt1.hash}`);
};

(async () => {
  try {
    await getBalance();
    await getInfo();
    await approveUSDC();
    await approveUSDT();
    // await approveWETH();
    await approveDAI();
  } catch (error) {
    console.log(error);
  }
})();
