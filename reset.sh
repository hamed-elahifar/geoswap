#!/bin/bash

cd $(dirname $0)

rm -rf ./Factory/abi
mkdir ./Factory/abi
rm -rf ./Factory/artifacts
rm -rf ./Factory/cache

rm -rf ./Tokens/abi
mkdir ./Tokens/abi
rm -rf ./Tokens/artifacts
rm -rf ./Tokens/cache

rm -rf ./Farm2/abi
mkdir ./Farm2/abi
rm -rf ./Farm2/artifacts
rm -rf ./Farm2/cache

rm -rf ./Staking/abi
mkdir ./Staking/abi
rm -rf ./Staking/artifacts
rm -rf ./Staking/cache

