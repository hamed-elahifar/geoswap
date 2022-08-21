console.clear();
require("dotenv").config();
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const ethers = require("ethers");

const moonbaseProviderRPC = {
  moonbase: {
    name: "moonbase-alpha",
    rpc: "https://rpc.api.moonbase.moonbeam.network",
    chainId: 1287, // 0x507 in hex,
    allowUnlimitedContractSize: true,
  },
};

const binanceProviderRPC = {
  moonbase: {
    name: "binance-test",
    rpc: "https://data-seed-prebsc-1-s1.binance.org:8545",
    chainId: 97,
    // gasLimit: 100_000_000_000_000,
    // allowUnlimitedContractSize: true,
    // gas: 2100000,
    // gasPrice: 8000000000,
  },
};

const providerRPC = moonbaseProviderRPC;

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

const getProviderInfo = async () => {
  const gasPrice = await provider.getGasPrice();
  console.log("Provider Gas Price:", +gasPrice);

  const latestBlock = await provider.getBlock("latest");
  // console.log("Provider Latest Block", latestBlock);
  console.log("Provider Gas Limit", +latestBlock.gasLimit);
};

const getNonce = async () => {
  const nonce = await provider.getTransactionCount(ownerAddress);
  console.log("Nonce is", nonce);
};

const { abi: routerABI } = require("../abi/router.json");
const { abi: factoryABI } = require("../abi/factory.json");

const routerAddress = "0xcEC6Cc2534e9b12978121717f8dC2cA4F531ac76";
const factoryAddress = "0x34101eDF6d2CF5FCBD03870c6524FcaD8e8f8587";

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const router = new ethers.Contract(routerAddress, routerABI, wallet);
const factory = new ethers.Contract(factoryAddress, factoryABI, wallet);

const getInfo = async () => {
  const WETH = await router.WETH();
  console.log(`WETH is: ${WETH}`);

  const factory = await router.factory();
  console.log(`factory address is: ${factory}`);
};

const USDC = "0xF572DF8281E109e014db8A3144A7a87512ba6820";
const USDT = "0xeE281CE1A7890Cb84a3eF3cfdfE357D703b7F47d";
const WETH = "0xF10D64Ff2d96234a7Fb01b55bDb2D39b610473fa";
const DAI = "0xd1145BAC492f1516FeABd6FA8AC63AE291630b24";

const addLiquidityA = async () => {
  const createReceipt = await router.addLiquidity(
    USDC, // address tokenA,
    USDT, // address tokenB,
    100_000, // uint256 amountADesired,
    100_000, // uint256 amountBDesired,
    100, // uint256 amountAMin,
    100, // uint256 amountBMin,
    ownerAddress, // address to,
    Math.floor(Date.now() / 1000) + 60 * 10, // uint256 deadline
    {
      gasPrice: ethers.utils.parseUnits("10", "gwei"),
      gasLimit: 1_000_000,
      from: ownerAddress,
    }
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const addLiquidityB = async () => {
  const createReceipt = await router.addLiquidity(
    USDT, // address tokenA,
    WETH, // address tokenB,
    100_000, // uint256 amountADesired,
    100_000, // uint256 amountBDesired,
    100, // uint256 amountAMin,
    100, // uint256 amountBMin,
    ownerAddress, // address to,
    Math.floor(Date.now() / 1000) + 60 * 10, // uint256 deadline
    {
      // gas: 2100000,
      gasPrice: ethers.utils.parseUnits("100", "gwei"),
      gasLimit: 10_000_000,
      from: ownerAddress,
    }
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const addLiquidityC = async () => {
  const createReceipt = await router.addLiquidity(
    USDT, // address tokenA,
    DAI, // address tokenB,
    100_000, // uint256 amountADesired,
    100_000, // uint256 amountBDesired,
    100, // uint256 amountAMin,
    100, // uint256 amountBMin,
    ownerAddress, // address to,
    Math.floor(Date.now() / 1000) + 60 * 10, // uint256 deadline
    {
      gasPrice: ethers.utils.parseUnits("1", "gwei"),
      gasLimit: 10_000_000,
    }
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

let allPairsLength;

const getAllPairsLength = async () => {
  allPairsLength = await factory.allPairsLength();

  console.log(`All Pairs Length: ${allPairsLength}`);
};

const allPairs = async () => {
  for (let i = 0; i < allPairsLength; i++) {
    const result = await factory.allPairs(i);
    console.log(`All Pairs[${i}]: ${result}`);
  }
};

const getPair = async (tokenA, tokenB) => {
  const details = await factory.getPair(tokenA, tokenB);
  console.log("TokenA", tokenA);
  console.log("TokenB", tokenB);
  console.log(`Details: ${details}`);
};

(async () => {
  try {
    await getBalance();
    await getProviderInfo();
    await getInfo();
    await getNonce();
    // await addLiquidityA();
    await addLiquidityB();
    // await addLiquidityC();
    // await getAllPairsLength();
    // await allPairs();
    // await getPair(USDC, USDT);
  } catch (error) {
    console.log(error);
  }
})();
