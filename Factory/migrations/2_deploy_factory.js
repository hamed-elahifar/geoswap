const Factory = artifacts.require("GeosFactory");
const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const WETH = artifacts.require("WETH");
const GeosRouter02 = artifacts.require("GeosRouter02");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async function (deployer, network, [owner1]) {
  await deployer.deploy(Factory, owner1);
  const factory = await Factory.deployed();

  await deployer.deploy(TokenA);
  const tokenA = await TokenA.deployed();

  await deployer.deploy(TokenB);
  const tokenB = await TokenB.deployed();

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();

  await sleep(1000);

  await deployer.deploy(GeosRouter02, factory.address, weth.address, {
    gas: 1_000_000_000,
  });
  const router = await GeosRouter02.deployed();
};
