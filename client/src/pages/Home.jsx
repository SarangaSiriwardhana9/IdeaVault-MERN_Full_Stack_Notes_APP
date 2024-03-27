/* eslint-disable no-unused-vars */
import React from "react";
import homeImage from "/Home.png"; 
import cloudBg from "/cloud.png";
import AppFooter from "../components/Footer";
import '../Font.css'

export default function Home() {
  return (
   
    <div className="">
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]">
  {/* Your content here */}
      {/* Left-hand side: Home image */}
      <div className="md:w-1/2">
        <img src={homeImage} alt="Home" className=" sha  w-full " />
      </div>
      
      {/* Right-hand side: Text content */}
        <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0" >
          <div className="">
          <h1 className="my-text text-3xl font-bold text-slate-600 mb-2 py-3 ">Welcome to Idea Vault</h1>
          <p className="my-text text-lg text-gray-800 ">
          Idea Vault is your personal space to jot down, organize, and access your ideas
      anytime, anywhere. Whether it&apos;s a creative spark, a project plan, or a quick
      reminder, Idea Vault keeps your thoughts safe and easily accessible.
          </p>
          
          <button className="bg-[#ffef94] hover:bg-[#fffeb4] shadow-lg text-slate-600 font-bold py-2 px-4  rounded-xl mt-4">
            Get Started
          </button>
          </div>
        </div>
    </div>
    <AppFooter />
    </div>
  );
}
