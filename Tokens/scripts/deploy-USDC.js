const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  console.log("USDC Token address:", usdc.address);

  const usdcData = {
    address: usdc.address,
    abi: JSON.parse(usdc.interface.format("json")),
  };

  fs.writeFileSync("abi/USDC.json", JSON.stringify(usdcData, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
