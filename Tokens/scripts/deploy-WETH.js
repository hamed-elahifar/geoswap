const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const WETH = await ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();
  console.log("WETH Token address:", weth.address);

  const wethData = {
    address: weth.address,
    abi: JSON.parse(weth.interface.format("json")),
  };

  fs.writeFileSync("abi/WETH.json", JSON.stringify(wethData, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
