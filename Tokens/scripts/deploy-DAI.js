const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const DAI = await ethers.getContractFactory("DAI");
  const dai = await DAI.deploy();
  console.log("DAI Token address:", dai.address);

  const daiData = {
    address: dai.address,
    abi: JSON.parse(dai.interface.format("json")),
  };

  fs.writeFileSync("abi/DAI.json", JSON.stringify(daiData, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
