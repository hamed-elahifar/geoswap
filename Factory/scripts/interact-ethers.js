console.clear();

const path = require("path");
const configFile = path.resolve(
  process.cwd(),
  "..",
  `.env.${process.env.NODE_ENV}`
);
require("dotenv").config({ path: configFile });

const ethers = require("ethers");

const routerAddress = process.env.ROUTER_ADDRESS;
const factoryAddress = process.env.FACTORY_ADDRESS;

const USDC = process.env.USDC;
const USDT = process.env.USDT;
const WETH = process.env.WETH;
const DAI = process.env.DAI;

const provider = new ethers.providers.StaticJsonRpcProvider(
  process.env.PROVIDER_RPC,
  {
    chainId: +process.env.CHAIN_ID,
    name: process.env.PROVIDER_NAME,
    // allowUnlimitedContractSize: true, // not sure if this should be here
  }
);

const ownerAddress = process.env.OWNER_ADDRESS;
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

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const router = new ethers.Contract(routerAddress, routerABI, wallet);
const factory = new ethers.Contract(factoryAddress, factoryABI, wallet);

const getInfo = async () => {
  const WETH = await router.WETH();
  console.log(`WETH is: ${WETH}`);

  const factory = await router.factory();
  console.log(`factory address is: ${factory}`);
};

const createPairA = async () => {
  const createReceipt = await factory.createPair(USDC, USDT, {
    // gasPrice: ethers.utils.parseUnits("10", "gwei"),
    // gasLimit: 1_000_000,
    // from: ownerAddress,
  });
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const addLiquidityA = async () => {
  const createReceipt = await router.addLiquidity(
    USDC, // address tokenA,
    USDT, // address tokenB,
    100_000n, // uint256 amountADesired,
    100_000n, // uint256 amountBDesired,
    100n, // uint256 amountAMin,
    100n, // uint256 amountBMin,
    ownerAddress, // address to,
    Math.floor(Date.now() / 1000) + 60 * 10, // uint256 deadline
    {
      // gasPrice: ethers.utils.parseUnits("10", "gwei"),
      // gasLimit: 1_000_000,
      // from: ownerAddress,
    }
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const createPairB = async () => {
  const createReceipt = await factory.createPair(USDT, WETH, {
    // gasPrice: ethers.utils.parseUnits("10", "gwei"),
    // gasLimit: 1_000_000,
    // from: ownerAddress,
  });
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

const createPairC = async () => {
  const createReceipt = await factory.createPair(USDT, DAI, {
    // gasPrice: ethers.utils.parseUnits("10", "gwei"),
    // gasLimit: 1_000_000,
    // from: ownerAddress,
  });
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

    // await createPairA();
    // await addLiquidityA();

    // await createPairB();
    // await addLiquidityB();

    // await createPairC();
    // await addLiquidityC();

    await getAllPairsLength();
    await allPairs();
    // await getPair(USDC, USDT);
  } catch (error) {
    console.log(error);
  }
})();
