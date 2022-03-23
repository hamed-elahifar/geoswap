const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const USDT = await ethers.getContractFactory("USDT");
  const usdt = await USDT.deploy();
  console.log("USDT Token address:", usdt.address);

  const usdtData = {
    address: usdt.address,
    abi: JSON.parse(usdt.interface.format("json")),
  };

  fs.writeFileSync("abi/USDT.json", JSON.stringify(usdtData, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
