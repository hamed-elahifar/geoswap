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

const routerAddress = "0xcEC6Cc2534e9b12978121717f8dC2cA4F531ac76";

const routerView = new ethers.Contract(routerAddress, routerABI, provider);

const getInfo = async () => {
  const WETH = await routerView.WETH();
  console.log(`WETH is: ${WETH}`);

  const factory = await routerView.factory();
  console.log(`factory address is: ${factory}`);
};

// 4. Create wallet
let wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const RouterChange = new ethers.Contract(routerAddress, routerABI, wallet);

const USDC = "0xd4e90eb2715e7E1849480c674b9C11e5A78Af403";
const USDT = "0x557a9Ccb11c4E147e011631050DDF8F9F0621cEE";

const addLiquidity = async () => {
  const createReceipt = await RouterChange.addLiquidity(
    USDC, // address tokenA,
    USDT, // address tokenB,
    1000, // uint256 amountADesired,
    1000, // uint256 amountBDesired,
    10, // uint256 amountAMin,
    10, // uint256 amountBMin,
    ownerAddress, // address to,
    new Date().getTime() + 1_000_000 // uint256 deadline
  );
  await createReceipt.wait();

  console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

(async () => {
  try {
    await getBalance();
    await getInfo();
    await addLiquidity();
  } catch (error) {
    console.log(error);
    // console.log(Object.keys(error));
  }
})();
