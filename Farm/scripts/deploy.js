const fs = require("fs");

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

  const Farm = await ethers.getContractFactory("GeosFarm");
  const farm = await Farm.deploy(token.address, 1, 0, 10_000_000);
  console.log("Farm address:", farm.address);

  const farmData = {
    address: farm.address,
    abi: JSON.parse(farm.interface.format("json")),
  };

  fs.writeFileSync("abi/farm.json", JSON.stringify(farmData, null, 2));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
