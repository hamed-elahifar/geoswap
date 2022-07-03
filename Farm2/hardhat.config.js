require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.1",
      },
      {
        version: "0.8.7",
      },
      {
        version: "0.6.12",
      },
      {
        version: "0.8.9",
      },
    ],
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
