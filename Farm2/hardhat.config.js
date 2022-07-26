require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

const runs = 1000;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs,
          },
        },
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs,
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs,
          },
        },
      },
    ],
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY],
      gas: 1_000_000_000_000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
    moonbeam: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
};
