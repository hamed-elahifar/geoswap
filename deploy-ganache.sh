#!/bin/bash

cd $(dirname $0)

cp -rf ./.env ./Tokens/
cp -rf ./.env ./Factory/
cp -rf ./.env ./Farm/
cp -rf ./.env ./Staking/

echo " ++++++++++ Deploying Tokens..."
cd Tokens
npm run ganache

echo " ++++++++++ Deploying Factory..."
cd ..
cd Factory
npm run ganache

echo " ++++++++++ Deploying Farm..."
cd ..
cd Farm
npm run ganache

echo " ++++++++++ Deploying Staking..."
cd ..
cd Staking
npm run ganache