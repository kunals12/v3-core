import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import { Pool } from '@uniswap/v3-sdk'
import { Token, CurrencyAmount } from '@uniswap/sdk-core'
import * as dotenv from 'dotenv'
dotenv.config()

const { abi } = require('../artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json')

async function createPool() {
  const [deployer] = await ethers.getSigners()

  const uniswapFactoryAddress = '0x5CE5223b2Da8D8bC4b3B121ece75311f144Ed8f8' // Replace with your contract address
  const uniswapFactory: Contract = new ethers.Contract(uniswapFactoryAddress, abi, deployer)
  // console.log({uniswapFactory});

  const fee = 3000 // Fee tier for the pool

  // const { tokenA, tokenB } = await deployTokens();
  // console.log({tokenA, tokenB});
  const tokenA = '0xe4C1CE15f6198A59d725e8C80DD5d51d10d9B2c9'
  const tokenB = '0xC4B204d5A3e86B3E3a9A18C2386C11cF7e9f4ba7'

  const tx = await uniswapFactory.createPool(tokenA, tokenB, fee)
  await tx.wait()
  console.log({ tx })
}

createPool().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
