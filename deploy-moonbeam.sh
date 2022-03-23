#!/bin/bash

cp ./.env ./Tokens/
cp ./.env ./Factory/
cp ./.env ./Farm/

echo "Deploying Tokens..."
cd Tokens
npm run moonbeam

echo "Deploying Factory..."
# cd ..
cd Factory
npm run moonbeam

echo "Deploying Farm..."
# cd ..
cd Farm
npm run moonbeam