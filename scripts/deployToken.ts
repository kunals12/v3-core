import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
// import { ContractFactory, ethers } from "ethers";
// const { abi, bytecode } = require("../artifacts/contracts/ERC20.sol/ERC20.json");
dotenv.config()

async function deployTokens() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  // TokenA
  const TokenA = await ethers.getContractFactory('ERC20');  
  const tokenA = await TokenA.deploy('Token A', 'TKA', 18, ethers.utils.parseUnits('1000', 18))
  await tokenA.deployed();  
  console.log('Token A deployed to:', tokenA.address)

  // Token B
  const TokenB = await ethers.getContractFactory('ERC20')
  const tokenB = await TokenB.deploy('Token B', 'TKB', 18, ethers.utils.parseUnits('10000000', 18))
  await tokenB.deployed()
  console.log('Token B deployed to:', tokenB.address)

//   Token A deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Token B deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
//   const tokens = {
//     tokenA: tokenA.address,
//     tokenB: tokenB.address,
//   }

//   return tokens;
}

// module.exports = deployTokens;
deployTokens().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
