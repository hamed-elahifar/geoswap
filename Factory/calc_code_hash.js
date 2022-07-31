const { bytecode } = require("./abis/GeosPair.json");
const { keccak256 } = require("@ethersproject/solidity");

const COMPUTED_INIT_CODE_HASH = keccak256(["bytes"], [`${bytecode}`]);

console.log(COMPUTED_INIT_CODE_HASH);
