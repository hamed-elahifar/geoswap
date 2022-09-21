# Prepare
run following command to create environment variables
export NODE_ENV=moonbeam 
make a copy of "env.sample" file with new name ".env.moonbeam"
both environment variables and file name should be the same
at first just fill private key and address, other parameters will be fill later

# Deploy
> this script should be executed from linux only.

### Tokens
run following command to deploy Tokens
> npx hardhat run scripts/deploy.js --network moonbeam

fill token address info in .env

go to Factory and deploy factory/router

> npx hardhat run scripts/deploy.js --network moonbeam

fill factory/router address info in .env

back to Token and run this command to permite alloance to factory/router

> npx hardhat run scripts/interact-ethers.js --network moonbeam

go to factory and create the pools

> npx hardhat run scripts/interact-ethers.js --network moonbeam

go to Farm2 deploy and interact
> npx hardhat run scripts/deploy.js --network moonbeam
> npx hardhat run scripts/interact-ethers.js --network moonbeam