const fs = require("fs");

const sleepDuration = 10000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  // =============================== Token ================================================

  const Token = await ethers.getContractFactory("GeosSwapTokenV2");
  const token = await Token.deploy(
    /* deployer.address /* trustedForwarder */
    "0x4FCDa98aE1dA6a54573263302E149831Bc35217C" // Behnam 0x4FCDa98aE1dA6a54573263302E149831Bc35217C
  );
  console.log("Token address:", token.address);

  const tokenData = {
    address: token.address,
    abi: JSON.parse(token.interface.format("json")),
  };

  fs.writeFileSync("abi/Token.json", JSON.stringify(tokenData, null, 2));

  // =============================== Farm ================================================

  // await sleep(sleepDuration);

  const Farm = await ethers.getContractFactory("GeosDistributorV2");
  const farm = await Farm.deploy(
    "0x76d3F8fd95879a5503dFFD30E0403694f566767D", // token.address, // geos.address,
    100, // geosPerSec,
    deployer.address, // dev.address,
    deployer.address, // treasury.address,
    deployer.address, // investor.address,
    200, // devPercent,
    200, // treasuryPercent,
    100 // investorPercent
  );
  
  console.log("Geos Distributor V2:", farm.address);

  const GeosDistributorV2Data = {
    address: farm.address,
    abi: JSON.parse(farm.interface.format("json")),
  };

  fs.writeFileSync(
    "abi/GeosDistributorV2.json",
    JSON.stringify(GeosDistributorV2Data, null, 2)
  );

  // =============================== Vault ================================================

  // await sleep(sleepDuration);

  // const Vault = await ethers.getContractFactory("GeosVault");
  // const vault = await Vault.deploy(token.address, 1, 0, 10_000_000);
  // console.log("Vault address:", vault.address);

  // const vaultData = {
  //   address: vault.address,
  //   abi: JSON.parse(vault.interface.format("json")),
  // };

  // fs.writeFileSync("abi/vault.json", JSON.stringify(vaultData, null, 2));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
