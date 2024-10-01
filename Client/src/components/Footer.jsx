import React from "react";

import logo from "../images/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-6 bg-gradient-to-r from-[#0e0e21] to-[#14142d]">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center mb-6">
      <div className="flex flex-[0.5] justify-center items-center mb-4 sm:mb-0">
        <img src={logo} alt="logo" className="w-40" />
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap w-full sm:mt-0 mt-5">
        <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out">
          Market
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out">
          Exchange
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out">
          Tutorials
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out">
          Wallets
        </p>
      </div>
    </div>

    <div className="text-center mb-6">
      <p className="text-gray-300 text-sm">Come join us and hear for the unexpected miracle</p>
      <p className="text-white text-sm font-medium mt-2">pawarpatik7349@gmail.com</p>
    </div>

    <div className="w-full h-[1px] bg-gray-500 mb-5" />

    <div className="w-full sm:w-[90%] flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@krypto2024</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
