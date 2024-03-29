/* eslint-disable no-unused-vars */
import React from "react";
import logo from "/logo.png";
import '../Font.css'

export default function About() {
  return (
    <div className="min-h-screen px-4 flex flex-col items-center justify-center bg-gradient-to-r from-[#ffffe0] via-[#fffed3] to-[#fdfdf9]">
      <div className="bg-gradient-to-r from-[#fcfce8] via-[#fff8f4] to-[#e7e77d] px-2 rounded-2xl my-8 mx-4 p-8 shadow-xl w-full max-w-2xl"> {/* Adjusted max-w-lg */}
      
        <img src={logo} alt="Idea Vault Logo" className="mx-auto w-62 h-26 mb-4" />
        
        <p className=" text-[#7c5836] my-text text-center mb-4">
        🫴  Idea Vault is a note-keeping web application designed to help you organize your thoughts,
          ideas, and tasks. With Idea Vault, you can easily create, edit, and manage your notes
          in a simple and efficient way.
        </p>
        <hr className="my-4" />
        <p className="text-[#7c5836] my-text  text-center mb-4">
          Our mission is to provide you with a platform that enhances your productivity and
          creativity by offering a streamlined note-taking experience. Whether you&apos;re a student,
          professional, or anyone in between, Idea Vault is here to simplify your life.
        </p>
        <hr className="my-4" />
        <p className="text-gray-600 text-center">
          Join us on this journey of innovation and organization. Let Idea Vault be your companion
          in capturing and organizing your ideas, so you can focus on what matters most to you.
        </p>
      </div>
    </div>
  );
}
