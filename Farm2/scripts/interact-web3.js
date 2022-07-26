require("dotenv").config();
const Web3 = require("web3");
const ethers = require("ethers");
const web3 = new Web3("https://rpc.api.moonbase.moonbeam.network");

const ownerAddress = "0x2AA9EA82AD7aC507401c652086584aE729A24C6D";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

web3.eth.getBalance(ownerAddress, (err, balance) => {
  console.log("Balnace is", web3.utils.fromWei(balance, "ether"));
});

const CONTRACT_ADDRESS = "0x51cbe251A48B82582052e5e4c1028300d742900d";
const { abi } = require("../abi/GeosDistributorV2.json");
const GeosDistributorV2 = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

(async (_) => {
  const poolLength = await GeosDistributorV2.methods.poolLength().call();
  console.log("poolLength", poolLength);
})();
