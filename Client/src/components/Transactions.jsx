import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg m-4 flex flex-col
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      p-4 rounded-lg shadow-2xl hover:shadow-3xl transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col justify-start w-full mb-4 p-2">
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-lg font-semibold">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-lg font-semibold">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-lg font-semibold">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-sm italic">Message: {message}</p>
            </>
          )}
        </div>
        {/* Fancy image with subtle hover zoom */}
        <img
          src={gifUrl || url}
          alt="Transaction GIF"
          className="w-full h-48 rounded-md shadow-lg object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 px-4 w-max rounded-full mt-2 shadow-lg">
          <p className="text-white font-semibold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center gradient-bg-transactions py-12 px-4">
      <div className="flex flex-col md:p-8 py-4 px-2">
        <h3 className="text-white text-3xl text-center font-bold mb-6 animate-fadeIn">
          {currentAccount ? "Latest Transactions" : "Connect your account to see the latest transactions"}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
