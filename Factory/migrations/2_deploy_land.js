const Factory = artifacts.require("SolarFactory");
const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const WETH = artifacts.require("WETH");
const SolarRouter02 = artifacts.require("SolarRouter02");

module.exports = async function (deployer, network, [owner1]) {
  await deployer.deploy(Factory, owner1);
  const factory = await Factory.deployed();

  await deployer.deploy(TokenA);
  const tokenA = await TokenA.deployed();

  await deployer.deploy(TokenB);
  const tokenB = await TokenB.deployed();

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();

  await deployer.deploy(SolarRouter02, factory.address, weth.address);
  const router = await SolarRouter02.deployed();
};
