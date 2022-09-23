const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const C = await ethers.getContractFactory("C");
  const c = await C.deploy();
  console.log("C Token address:", c.address);

  const cData = {
    address: c.address,
    abi: JSON.parse(c.interface.format("json")),
  };

  fs.writeFileSync("abi/C.json", JSON.stringify(cData, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
