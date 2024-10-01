const hre = require("hardhat");

const main = async () => {
  // Get the contract factory for "Transactions"
  const Transactions = await hre.ethers.getContractFactory("Transactions");

  // Deploy the contract
  const transactions = await Transactions.deploy();

  // If you are using ethers v6, you do not need to await the .deployed() method
  console.log("Transactions deployed to:", transactions.target); // In ethers v6, use `.target` instead of `.address`
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // Exit on success
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit on failure
  }
};

runMain();
