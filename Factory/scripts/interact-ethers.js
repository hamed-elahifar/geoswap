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

const USDC = "0xd4e90eb2715e7E1849480c674b9C11e5A78Af403";
const USDT = "0x557a9Ccb11c4E147e011631050DDF8F9F0621cEE";
const WETH = "0xa8FE53e9A816EA38B20b42f10F09906e6DcaC46a";

const addLiquidity = async () => {
  const createReceipt = await router.addLiquidity(
    USDC, // address tokenA,
    USDT, // address tokenB,
    100_000, // uint256 amountADesired,
    100_000, // uint256 amountBDesired,
    100, // uint256 amountAMin,
    100, // uint256 amountBMin,
    ownerAddress, // address to,
    Math.floor(Date.now() / 1000) + 60 * 10 // uint256 deadline
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
  console.log('TokenA',tokenA)
  console.log('TokenB',tokenB)
  console.log(`Details: ${details}`);
};

(async () => {
  try {
    await getBalance();
    // await getInfo();
    // await addLiquidity();
    await getAllPairsLength();
    await allPairs();
    // await getPair(USDC, USDT);
  } catch (error) {
    console.log(error);
  }
})();
