const { expect } = require("chai");
const { ethers, BigNumber } = require("hardhat");
const { upgrades } = require("hardhat");

describe("Marketplace Flow Tests", function () {

    let llpfactory;
    let companyContract;
    
    beforeEach(async function () {
        [LLPSA, Investor1, Investor2] = await ethers.getSigners();
    });

    describe("Deployments", async () => {
        it("Deployment of all contracts", async function () {
             const usdt = await ethers.getContractFactory("CompanyFactory");
             llpfactory = await usdt.deploy(LLPSA.address);
             usdtAddress = llpfactory.address;
             console.log("Deployed Factory Contract: " + usdtAddress);
        })
    });

    describe("Launch company", function () {

        it("Deploy new company", async function () {
           let call = await llpfactory.deployCompanyContract("First_Marketplace","FMP", ethers.utils.parseUnits("10000", "ether"), LLPSA.address );
           let proxyaddress = await  llpfactory.getCompany(LLPSA.address, 0);
           let proxy = await ethers.getContractFactory("Company");
           companyContract = proxy.attach(proxyaddress);
        });
     
        it("Mint tokens to them", async function () {
    
          await companyContract.connect(LLPSA).bulkMint([Investor1.address, Investor2.address],[ethers.utils.parseUnits("100", "ether"), ethers.utils.parseUnits("200", "ether")]);
        
        });
    
    
    
      })

});