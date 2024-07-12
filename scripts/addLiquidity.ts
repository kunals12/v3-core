import { ethers } from "hardhat";
import { Contract } from "ethers";
import { Token } from "@uniswap/sdk-core";
import * as dotenv from "dotenv";
dotenv.config();

const { abi: factoryAbi } = require("../artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json");
const { abi: poolAbi } = require("../artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const {abi: erc20Abi} = require("../artifacts/contracts/ERC20.sol/ERC20.json");
// const { abi: positionManagerAbi } = require("../artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json");


async function main() {
  const [deployer] = await ethers.getSigners();

  const uniswapFactoryAddress = "0x5CE5223b2Da8D8bC4b3B121ece75311f144Ed8f8"; // Replace with your contract address
  const uniswapFactory: Contract = new ethers.Contract(uniswapFactoryAddress, factoryAbi, deployer);

  const tokenAAddress = "0xe4C1CE15f6198A59d725e8C80DD5d51d10d9B2c9"; // Replace with Token A address
  const tokenBAddress = "0xC4B204d5A3e86B3E3a9A18C2386C11cF7e9f4ba7"; // Replace with Token B address
  const fee = 3000; // Fee tier

  const poolAddress = await uniswapFactory.getPool(tokenAAddress, tokenBAddress, fee);
  console.log({poolAddress});
  
  const poolContract: Contract = new ethers.Contract(poolAddress, poolAbi, deployer);
  const tokenAContract = new ethers.Contract(tokenAAddress, erc20Abi, deployer);
  const tokenBContract = new ethers.Contract(tokenBAddress, erc20Abi, deployer);

  // console.log(pool.functions);
  

  const tokenA = new Token(1337, tokenAAddress, 18, "TKA", "Token A");
  const tokenB = new Token(1337, tokenBAddress, 18, "TKB", "Token B");  

  // check balance for tokenA and tokenB
  const tokenABalance = await tokenAContract.balanceOf(deployer.address);
  const tokenBBalance = await tokenBContract.balanceOf(deployer.address);
  const tokenABalanceToString = tokenABalance.toString();
  const tokenBBalanceToString = tokenBBalance.toString();
  console.log(`token A Balance : ${tokenABalanceToString}, token B Balance : ${tokenBBalanceToString}`);
  
  async function getPoolInfo(poolContract: Contract) {
    const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ])

  return {
    token0,
    token1,
    fee,
    tickSpacing,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  }
  }

  const poolInfo = await getPoolInfo(poolContract);
  console.log({poolInfo});
  

  // console.log(1234566);
  
  // const poolInstance = new Pool(
  //   tokenA,
  //   tokenB,
  //   poolInfo.fee,
  //   poolInfo.sqrtPriceX96.toString(),
  //   poolInfo.liquidity.toString(),
  //   poolInfo.tick
  // );

  // console.log("pool instance", poolInstance);

  // const amountA = CurrencyAmount.fromRawAmount(tokenA, ethers.utils.parseUnits("1", 18).toString());
  // const amountB = CurrencyAmount.fromRawAmount(tokenB, ethers.utils.parseUnits("1", 18).toString());

  // console.log({ amountA, amountB });

  // const liquidityAmount = ethers.utils.parseUnits("1", 18).toString();
  // console.log({ liquidityAmount });

  // const tickSpacing = 60; // Example tick spacing, you need to calculate this based on your pool fee tier
  // const currentTick = poolInstance.tickCurrent;
  // const tickLower = nearestUsableTick(currentTick, tickSpacing) - tickSpacing * 2;
  // const tickUpper = nearestUsableTick(currentTick, tickSpacing) + tickSpacing * 2;

  // const position = new Position({
  //   pool: poolInstance,
  //   liquidity: liquidityAmount,
  //   tickLower,
  //   tickUpper,
  // });

  // console.log("Position", position);
}


  // const PositionManager = await ethers.getContractFactory("NonfungiblePositionManager");
  // const positionManager = await PositionManager.deploy();
  // await positionManager.deployed();

  // const positionManagerAddress = positionManager.address;; // Replace with your contract address
  // // const positionManager: Contract = new ethers.Contract(positionManagerAddress, positionManagerAbi, deployer);

  // const tx = await positionManager.mint({
  //   token0: tokenA.address,
  //   token1: tokenB.address,
  //   fee,
  //   tickLower: position.tickLower,
  //   tickUpper: position.tickUpper,
  //   amount0Desired: amountA.quotient.toString(),
  //   amount1Desired: amountB.quotient.toString(),
  //   amount0Min: 0,
  //   amount1Min: 0,
  //   recipient: deployer.address,
  //   deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  // });
  // await tx.wait();

  // console.log("Liquidity added to the pool");
// }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
