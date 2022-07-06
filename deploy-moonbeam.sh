#!/bin/bash

cd $(dirname $0)

cp -rf ./.env ./Tokens/
cp -rf ./.env ./Factory/
cp -rf ./.env ./Farm2/
cp -rf ./.env ./Staking/

echo " ++++++++++ Deploying Tokens..."
cd Tokens
npm run moonbeam

echo " ++++++++++ Deploying Factory..."
cd ..
cd Factory
npm run moonbeam

echo " ++++++++++ Deploying Farm V2..."
cd ..
cd Farm2
npm run moonbeam

echo " ++++++++++ Deploying Staking..."
cd ..
cd Staking
npm run moonbeam