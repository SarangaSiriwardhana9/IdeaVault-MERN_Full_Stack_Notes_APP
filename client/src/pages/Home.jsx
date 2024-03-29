/* eslint-disable no-unused-vars */
import React from "react";
import homeImage from "/Home.png";
import { Link } from "react-router-dom";
import '../Font.css'
import Testimonials from "../components/Testimonials";
import Services from "../components/Services";
import Contact from "../components/Contact";





export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]">
      <div className="container mx-auto px-4  flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left-hand side: Home image */}
        <div className="md:w-1/2">
          <img
            src={homeImage}
            alt="Home"
            className=" w-full"
            style={{ maxWidth: "100%" }}
          />
        </div>

        {/* Right-hand side: Text content */}
        <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
          <div>
            <h1 className="my-text  text-3xl md:text-4xl font-bold text-slate-600 mb-2 py-3">
              Welcome to  <span/>
              <span className="text-shadow-title text-[#7c5836]">Idea Vault 🗒😍</span>
            </h1>
            <p className="my-text  text-lg text-gray-800">
              Idea Vault is your personal space to jot down, organize, and access your ideas anytime, anywhere. Whether it&apos;s a creative spark, a project plan, or a quick reminder, Idea Vault keeps your thoughts safe and easily accessible.
            </p>
            <p className="my-text text-lg text-gray-800">
              Idea Vault offers a seamless experience for capturing and nurturing your ideas.
            </p>
            <div className="py-6">
              <Link
                to="/createnote"
                className="bg-[#ffef94] hover:bg-[#fffeb4] shadow-lg text-slate-600 font-bold py-2 px-4 rounded-xl mt-4"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Idea Vault */}
      <Services />

      {/* Customer Testimonials or Success Stories */}
      <Testimonials />

      {/* Contact Us */}
      <Contact />

    </div>
  );
}
