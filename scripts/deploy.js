const hre = require("hardhat");
const { expect } = require("chai");
const { ethers, BigNumber } = require("hardhat");
const { upgrades } = require("hardhat");

async function main() {


  const [deployer] = await ethers.getSigners();
  console.log("Admin WalletAddress(hardhat)", deployer.address);
  console.log("Admin wallet balance:", (await deployer.getBalance()).toString());

  const usdt = await ethers.getContractFactory("CompanyFactory");
  llpfactory = await usdt.deploy(deployer.address);
  usdtAddress = llpfactory.address;
  console.log("Deployed Factory Contract: " + usdtAddress);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
