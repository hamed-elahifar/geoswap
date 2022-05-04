require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {},
    moonbeam: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1287,
    },
    // dev: {
    //   url: "http://127.0.0.1:9933",
    //   accounts: [privateKeyDev],
    //   network_id: "1281",
    //   chainId: 1281,
    // },
    ganache: {
      url: "HTTP://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY],
      network_id: "5777",
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/f7d1c49c04394eeab54c419a185c9b1d",
      accounts: [process.env.PRIVATE_KEY],
      network_id: "3",
      chainId: 3,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
