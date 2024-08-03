require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

const PRIVATE_KEY="7ab8f5f107f2bca5dbf1521b95f6bd816db8f2e900a1b2d94b3c94575136bc79";
const GOERLI_RPC_ENDPOINT="https://goerli.infura.io/v3/f3fab96fdfac418cae7e16e67ee18e00";
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const CMP_KEY = process.env.CMP_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  allowUnlimitedContractSize: true,
  networks: {
    goerli: {
      url: GOERLI_RPC_ENDPOINT,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337 
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [PRIVATE_KEY],
    },
    polygonTestnet: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/vNUyKel8--mlMjHITmUgaTfh0aM_9qVa`,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/f3fab96fdfac418cae7e16e67ee18e00`,
      accounts: [PRIVATE_KEY],
    }
        // polygon: {
    //   url: `https://1rpc.io/matic	`,
    //   accounts: [P_KEY],
    // }
  },
  etherscan: {
    apiKey: "61N617T3TM3EY4A6FHWP3AU3EIPP1MFP34"
  },
  gasReporter: {
    gasPrice: 22,
    enabled: false,
    token: "ETH"
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    }
  }
};
