require("dotenv").config();
const ethers = require("ethers");

const providerRPC = {
  moonbase: {
    name: "moonbase-alpha",
    rpc: "https://rpc.api.moonbase.moonbeam.network",
    chainId: 1287, // 0x507 in hex,
  },
};
// ethers provider
const provider = new ethers.providers.StaticJsonRpcProvider(
  providerRPC.moonbase.rpc,
  {
    chainId: providerRPC.moonbase.chainId,
    name: providerRPC.moonbase.name,
  }
);

const ownerAddress = "0x2AA9EA82AD7aC507401c652086584aE729A24C6D";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Get balance
const getBalance = async () => {
  const ownerBalance = ethers.utils.formatEther(
    await provider.getBalance(ownerAddress)
  );
  console.log(`Owner Balance is: ${ownerBalance} ETH`);
};

let wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const { abi: usdcABI } = require("../abi/USDC.json");
const { abi: usdtABI } = require("../abi/USDT.json");
const { abi: wethABI } = require("../abi/WETH.json");

const usdcAddress = "0xd4e90eb2715e7E1849480c674b9C11e5A78Af403";
const usdtAddress = "0x557a9Ccb11c4E147e011631050DDF8F9F0621cEE";
const wethAddress = "0xa8FE53e9A816EA38B20b42f10F09906e6DcaC46a";
const routerAddress = "0xcEC6Cc2534e9b12978121717f8dC2cA4F531ac76";

const USDC = new ethers.Contract(usdcAddress, usdcABI, wallet);
const USDT = new ethers.Contract(usdtAddress, usdtABI, wallet);
const WETH = new ethers.Contract(wethAddress, wethABI, wallet);

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
};

const amount = 100_000;

const approveUSDC = async () => {
  const createReceipt = await USDC.approve(routerAddress, amount);
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const approveUSDT = async () => {
  const createReceipt = await USDT.approve(routerAddress, amount);
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const approveWETH = async () => {
  const createReceipt = await WETH.approve(routerAddress, amount);
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

(async () => {
  try {
    await getBalance();
    // await getInfo();
    await approveUSDC();
    await approveUSDT();
    await approveWETH();
  } catch (error) {
    console.log(error);
  }
})();
