/* eslint-disable no-unused-vars */
import React from "react";
import homeImage from "/Home.png"; 
import cloudBg from "/cloud.png";
import AppFooter from "../components/Footer";
import '../Font.css'
import { Link } from "react-router-dom";
import logo from '/logo.png';
import  Footer  from "../components/Footer";

export default function Home() {
  return (
    <div className=" h-screen flex flex-col bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]">
    <div className=" mx-2  flex  flex-col md:flex-row items-center justify-center ">
   
      {/* Left-hand side: Home image */}
      <div className="md:w-1/2">
       


       <div>
       <img
          src={homeImage}
          alt="Home"
          className="sha w-full"
          style={{ maxWidth: "100%" }}
        />
       </div>
      </div>

      {/* Right-hand side: Text content */}
      <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
        <div className="">
          <h1 className="my-text text-3xl font-bold text-slate-600 mb-2 py-3 ">
            Welcome to  <span/>
            <span className="text-[#7c5836]">
             Idea Vault 🗒😍
            </span>
          </h1>
          <p className="my-text text-lg text-gray-800 ">
            Idea Vault is your personal space to jot down, organize, and access
            your ideas anytime, anywhere. Whether it&apos;s a creative spark, a
            project plan, or a quick reminder, Idea Vault keeps your thoughts
            safe and easily accessible.
          </p>

          <div className="py-6">
            <Link
              to="/createnote"
              className="bg-[#ffef94] hover:bg-[#fffeb4] shadow-lg text-slate-600 font-bold py-2 px-4  rounded-xl mt-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      
    </div>

    {/* Why chose Idea vaVault */}
    <div className="mb-16">
    <div className="flex flex-col items-center justify-center mt-4  p-8">
      <h2 className="my-text text-2xl font-bold text-slate-600 mb-2">
        Why Choose Idea Vault?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#ffef94] p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-slate-600 mb-2">Secure</h3>
          <p className="text-gray-800">
            Your data is safe with us. Idea Vault uses industry-standard
            encryption to protect your ideas.
          </p>
        </div>
        <div className="bg-[#ffef94] p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-slate-600 mb-2">Accessible</h3>
          <p className="text-gray-800">
            Access your ideas on the go. Idea Vault is available on all your
            devices.
          </p>
        </div>
        <div className="bg-[#ffef94] p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-slate-600 mb-2">Organized</h3>
          <p className="text-gray-800">
            Keep your ideas organized with Idea Vault&apos;s intuitive interface
            and powerful features.
          </p>
        </div>
      </div>
      </div>
      </div>

      


    
    </div>
  );
}