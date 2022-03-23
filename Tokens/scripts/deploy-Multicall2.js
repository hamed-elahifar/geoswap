const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const Multicall2 = await ethers.getContractFactory("Multicall2");
  const multicall2 = await Multicall2.deploy();
  console.log("Multicall v2 address:", multicall2.address);

  const multicall2Data = {
    address: multicall2.address,
    abi: JSON.parse(multicall2.interface.format("json")),
  };

  fs.writeFileSync(
    "abi/Multicall2.json",
    JSON.stringify(multicall2Data, null, 2)
  );
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
