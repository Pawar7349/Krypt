import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../images/logo.png";

const NavBarItem = ({ title }) => (
  <li className="mx-4 cursor-pointer text-white hover:text-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
    {title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-xl">
      <img src={logo} alt="logo" className="w-36 cursor-pointer" />
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex list-none flex-row justify-between items-center">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item) => (
          <NavBarItem key={item} title={item} />
        ))}
        <li className="bg-white text-pink-600 py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
          Login
        </li>
      </ul>

      {/* Mobile Menu */}
      <div className="flex relative">
        {!toggleMenu ? (
          <HiMenu
            fontSize={30}
            className="text-white cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <AiOutlineClose
            fontSize={30}
            className="text-white cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}

        {toggleMenu && (
          <ul className="z-20 fixed top-0 right-0 p-5 w-[60vw] h-full bg-white/30 backdrop-blur-md shadow-lg list-none flex flex-col items-center space-y-6 text-white animate-slide-in">
            <li className="text-xl w-full flex justify-end">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item) => (
              <NavBarItem key={item} title={item} />
            ))}
            <li className="bg-white text-pink-600 py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
