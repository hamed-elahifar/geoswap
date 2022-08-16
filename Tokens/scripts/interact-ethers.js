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

const ownerAddress = "0xfDe2b8b5fb8B03CB4eCc92791D67002D54B821Ad";
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
const { abi: daiABI } = require("../abi/DAI.json");

const usdcAddress = "0xd1145BAC492f1516FeABd6FA8AC63AE291630b24";
const usdtAddress = "0xeE281CE1A7890Cb84a3eF3cfdfE357D703b7F47d";
const wethAddress = "0xF10D64Ff2d96234a7Fb01b55bDb2D39b610473fa";
const daiAddress = "0xF572DF8281E109e014db8A3144A7a87512ba6820";
const routerAddress = "0xE9E1d9A3F08CBeb9850bE90d1687D4d042d76eCF";

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

const approveDAI = async () => {
  const createReceipt = await DAI.approve(routerAddress, amount);
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

(async () => {
  try {
    await getBalance();
    await getInfo();
    await approveUSDC();
    await approveUSDT();
    await approveWETH();
    await approveDAI();
  } catch (error) {
    console.log(error);
  }
})();
