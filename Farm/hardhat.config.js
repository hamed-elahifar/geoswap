require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.6.12",
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
