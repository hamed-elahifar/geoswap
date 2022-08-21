#!/bin/bash

cd $(dirname $0)

echo " ++++++++++ Deploying Tokens..."
cd Tokens
npm run ganache

echo " ++++++++++ Deploying Factory..."
cd ..
cd Factory
npm run ganache

echo " ++++++++++ Deploying Farm V2..."
cd ..
cd Farm2
npm run ganache

echo " ++++++++++ Deploying Staking..."
cd ..
cd Staking
npm run ganache