require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        // settings: {
        //   optimizer: {
        //     enabled: true,
        //     runs: 1000,
        //   },
        // },
      },
      {
        version: "0.5.16",
        // settings: {
        //   optimizer: {
        //     enabled: true,
        //     runs: 1000,
        //   },
        // },
      },
      {
        version: "0.6.6",
        // settings: {
        //   optimizer: {
        //     enabled: true,
        //     runs: 1000,
        //   },
        // },
      },
      {
        version: "0.5.0",
      },
    ],
    overrides: {
      "./contracts/*.sol": {
        version: "0.8.2",
        settings: {},
      },
      "./contracts/Multicall2.sol": {
        version: "0.5.0",
        settings: {},
      },
      "./contracts/core/UniswapV2ERC20.sol": {
        version: "0.5.16",
        settings: {},
      },
      "./contracts/core/UniswapV2Factory.sol": {
        version: "0.5.16",
        settings: {},
      },
      "./contracts/core/UniswapV2Pair.sol": {
        version: "0.5.16",
        settings: {},
      },
      "./contracts/periphery/UniswapV2Migrator.sol": {
        version: "0.6.6",
        settings: {},
      },
      "./contracts/periphery/UniswapV2Router02.sol": {
        version: "0.6.6",
        settings: {},
      },
    },
  },
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
    moonbeam: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
