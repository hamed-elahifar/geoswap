const fs = require("fs");

const sleepDuration = 30000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  // =============================== Token ================================================

  const Token = await ethers.getContractFactory("GeosSwapToken");
  const token = await Token.deploy();
  console.log("Token address:", token.address);

  const tokenData = {
    address: token.address,
    abi: JSON.parse(token.interface.format("json")),
  };

  fs.writeFileSync("abi/Token.json", JSON.stringify(tokenData, null, 2));

  // =============================== Farm ================================================

  await sleep(sleepDuration);

  const Farm = await ethers.getContractFactory("GeosFarm");
  const farm = await Farm.deploy(token.address, 1, 0, 10_000_000);
  console.log("Farm address:", farm.address);

  const farmData = {
    address: farm.address,
    abi: JSON.parse(farm.interface.format("json")),
  };

  fs.writeFileSync("abi/farm.json", JSON.stringify(farmData, null, 2));

  // =============================== Vault ================================================

  await sleep(sleepDuration);

  const Vault = await ethers.getContractFactory("GeosVault");
  const vault = await Vault.deploy(token.address, 1, 0, 10_000_000);
  console.log("Vault address:", vault.address);

  const vaultData = {
    address: vault.address,
    abi: JSON.parse(vault.interface.format("json")),
  };

  fs.writeFileSync("abi/vault.json", JSON.stringify(vaultData, null, 2));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
