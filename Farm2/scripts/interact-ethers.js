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

const { abi } = require("../abi/GeosDistributorV2.json");

const contractAddress = "0x51cbe251A48B82582052e5e4c1028300d742900d";

// Create contract instance
const GeosDistributorV2View = new ethers.Contract(
  contractAddress,
  abi,
  provider
);

const getPoolLength = async () => {
  const poolLength = await GeosDistributorV2View.poolLength();
  console.log(`Pool Length is: ${poolLength}`);
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

(async () => {
  await getBalance();
  await getPoolLength();
  await startFarming();
})();
