const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", balance.toString());

  const Token = await ethers.getContractFactory("GeosSwapToken");
  const token = await Token.deploy();
  console.log("Token address:", token.address);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format("json")),
  };

  fs.writeFileSync('abi/Token.json', JSON.stringify(data, null, 2));
}

main()
  .then(() => {
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
