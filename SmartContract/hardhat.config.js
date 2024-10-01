
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity : '0.8.0',
  networks : {
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ZeXJCBZtGHZWz-KGF8OlMFihkiLxf8r_",
      accounts: ['305f247c226593d1cb8154ec961908542278a4f2f59beee582cb09f4ef6c0aae']
    }
  }
}