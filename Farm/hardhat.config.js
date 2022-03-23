require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.6.12",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [process.env.GANACHE_PRIVATE_KEY],
    },
    moonbeam: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.MOONBEAM_PRIVATE_KEY],
    },
  },
};
