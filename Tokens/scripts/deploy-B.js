const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const B = await ethers.getContractFactory("B");
  const b = await B.deploy();
  console.log("B Token address:", b.address);

  const bData = {
    address: b.address,
    abi: JSON.parse(b.interface.format("json")),
  };

  fs.writeFileSync("abi/B.json", JSON.stringify(bData, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
