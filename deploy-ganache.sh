#!/bin/bash

cp ./.env ./Tokens/
cp ./.env ./Factory/
cp ./.env ./Farm/

echo "Deploying Tokens..."
cd Tokens
npm run ganache

echo "Deploying Factory..."
# cd ..
cd Factory
npm run ganache

echo "Deploying Farm..."
# cd ..
cd Farm
npm run ganache