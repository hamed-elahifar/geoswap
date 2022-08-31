const path = require("path");
const configFile = path.resolve(
  process.cwd(),
  "..",
  `.env.${process.env.NODE_ENV}`
);
require("dotenv").config({ path: configFile });

const ethers = require("ethers");

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

const contractAddress = process.env.GEOS_DISTRIBUTOR_V2;

// Get balance
const getBalance = async () => {
  const ownerBalance = ethers.utils.formatEther(
    await provider.getBalance(ownerAddress)
  );
  console.log(`Owner Balance is: ${ownerBalance} ETH`);
};

const { abi } = require("../abi/GeosDistributorV2.json");

// Create contract instance
const GeosDistributorV2View = new ethers.Contract(
  contractAddress,
  abi,
  provider
);

let allPoolLength;

const getPoolLength = async () => {
  allPoolLength = await GeosDistributorV2View.poolLength();
  console.log(`Pool Length is: ${allPoolLength}`);
};

// 4. Create wallet
let wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const GeosDistributorV2Change = new ethers.Contract(
  contractAddress,
  abi,
  wallet
);

const startFarming = async () => {
  const createReceipt = await GeosDistributorV2Change.startFarming();
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const addPoolA = async () => {
  const createReceipt = await GeosDistributorV2Change.add(
    "100", // uint256 _allocPoint,
    process.env.PAIRS_A, // IBoringERC20 _lpToken,
    0, // uint16 _depositFeeBP,
    0 // uint256 _harvestInterval
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const addPoolB = async () => {
  const createReceipt = await GeosDistributorV2Change.add(
    "100", // uint256 _allocPoint,
    process.env.PAIRS_B, // IBoringERC20 _lpToken,
    0, // uint16 _depositFeeBP,
    0 // uint256 _harvestInterval
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const addPoolC = async () => {
  const createReceipt = await GeosDistributorV2Change.add(
    "100", // uint256 _allocPoint,
    process.env.PAIRS_C, // IBoringERC20 _lpToken,
    0, // uint16 _depositFeeBP,
    0 // uint256 _harvestInterval
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

const getAllPoolInfo = async () => {
  for (let i = 0; i < allPoolLength; i++) {
    const result = await GeosDistributorV2Change.poolInfo(i);
    console.log(`Pool Info for index[${i}]: ${result}`);
  }
};

(async () => {
  await getBalance();
  await getPoolLength();
  await startFarming();
  // await addPoolA();
  // await addPoolB();
  // await addPoolC();
  await getAllPoolInfo();
})();
