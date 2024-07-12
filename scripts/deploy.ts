// import { ContractFactory, Contract, Signer, ethers } from "ethers";
import { ethers } from "hardhat";
const { abi, bytecode } = require("../artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json");
import "dotenv/config";

async function main() {   
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  // TokenA
  const UniswapV3Factory = await ethers.getContractFactory('UniswapV3Factory');
  
  const uniswapFactoryContract = await UniswapV3Factory.deploy()

  await uniswapFactoryContract.deployed();  
  console.log('deployed to:', uniswapFactoryContract.address) // 0x5FbDB2315678afecb367f032d93F642f64180aa3

    // const signer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, ethers.getDefaultProvider("sepolia"));
    // console.log((await signer.getBalance()).toString())
    // const UniswapV3Factory = new ContractFactory(abi, bytecode, signer);
    // // // console.log(UniswapV3Factory);
    
    //  const uniswapFactoryContract = await UniswapV3Factory.deploy();
    //  await uniswapFactoryContract.deployed();
    //  console.log("Uniswap V3 Pool deployed to:", uniswapFactoryContract.address);
}

main().catch((error) => {
    console.error("error", error);
    process.exitCode = 1;
  });