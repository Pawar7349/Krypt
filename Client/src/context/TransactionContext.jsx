import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants.js";

// Creating context
export const TransactionContext = createContext();

// Ethereum initialization check
const { ethereum } = window;

// Create Ethereum Contract Function with checks
const createEthereumContract = async () => {
  if (!ethereum) {
    console.error("Ethereum object not found. Make sure MetaMask is installed.");
    return null; // Ensure we return early if no Ethereum object is found
  }

  try {
    // Initialize provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(); // Await the signer
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
  } catch (error) {
    console.error("Error creating Ethereum contract:", error);
    return null;
  }
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  // Handle input change
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Fetch all transactions
  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        console.log("Ethereum is not present.");
        return;
      }

      const transactionsContract = await createEthereumContract();
      if (!transactionsContract) return;

      const availableTransactions = await transactionsContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        // Handle timestamp conversion safely
        timestamp: transaction.timestamp?.toNumber 
                  ? new Date(transaction.timestamp.toNumber() * 1000).toLocaleString() 
                  : new Date(transaction.timestamp * 1000).toLocaleString(), // Adjust based on data type
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
      }));

      setTransactions(structuredTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      throw new Error("No Account Found");
    }
  };

  // Check if any transactions exist
  const checkIfTransactionsExist = async () => {
    try {
      if (!ethereum) return;

      const transactionsContract = await createEthereumContract();
      if (!transactionsContract) return; // Exit if no contract

      const currentTransactionCount = await transactionsContract.getTransactionsCount();
      localStorage.setItem("transactionCount", currentTransactionCount.toString());
    } catch (error) {
      console.error("Error checking transaction existence:", error);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Send Transaction
  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        console.log("Ethereum is not available.");
        return;
      }

      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = await createEthereumContract();
      if (!transactionsContract) return;

      const parsedAmount = ethers.parseEther(amount); // Convert to wei

      // Send Ethereum transaction
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 Gwei
            value: parsedAmount._hex, // Hexadecimal representation of the amount
          },
        ],
      });

      const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      setIsLoading(true);

      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);

      setIsLoading(false);

      const transactionsCount = await transactionsContract.getTransactionsCount();
      setTransactionCount(transactionsCount.toNumber());
      window.location.reload();
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
