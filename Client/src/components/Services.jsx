import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-col justify-start items-center p-6 m-4 bg-[#1F1F2F] rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
    {/* Circle Icon */}
    <div className={`w-16 h-16 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="mt-6 text-center">
      <h3 className="text-2xl text-white font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-4">{subtitle}</p>
    </div>
  </div>
);

const Services = () => (
  <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0f1f] to-[#141425] py-16 px-6">
    <div className="max-w-7xl w-full">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Premium Services</h1>
        <p className="mt-4 text-lg text-gray-300">We continually improve our offerings to provide you with top-notch services for buying and selling crypto assets.</p>
      </div>

      {/* Updated Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <ServiceCard
          color="bg-gradient-to-r from-blue-400 to-blue-600"
          title="Security Guarantee"
          icon={<BsShieldFillCheck fontSize={28} className="text-white" />}
          subtitle="Your transactions and data are secured with the highest standards of encryption and privacy."
        />
        <ServiceCard
          color="bg-gradient-to-r from-purple-400 to-purple-600"
          title="Best Exchange Rates"
          icon={<BiSearchAlt fontSize={28} className="text-white" />}
          subtitle="We offer competitive exchange rates ensuring you always get the best deals for your trades."
        />
        <ServiceCard
          color="bg-gradient-to-r from-red-400 to-red-600"
          title="Fastest Transactions"
          icon={<RiHeart2Fill fontSize={28} className="text-white" />}
          subtitle="Enjoy lightning-fast transactions with guaranteed reliability and accuracy."
        />
      </div>
    </div>
  </div>
);

export default Services;
