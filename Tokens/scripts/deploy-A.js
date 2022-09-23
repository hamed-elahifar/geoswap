const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const A = await ethers.getContractFactory("A");
  const a = await A.deploy();
  console.log("A Token address:", a.address);

  const aData = {
    address: a.address,
    abi: JSON.parse(a.interface.format("json")),
  };

  fs.writeFileSync("abi/A.json", JSON.stringify(aData, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
