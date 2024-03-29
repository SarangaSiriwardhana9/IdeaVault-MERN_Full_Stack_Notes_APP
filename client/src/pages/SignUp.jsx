/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import OAuth from "../components/OAuth";
import '../Font.css'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sign up failed");
      }

      console.log(data);
      setFormData({});
      setLoading(false);

      // Show success toast
      toast.success('Sign up successful! Please sign in.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        //colour yellow
        style: {
          backgroundColor: '#fff4c2',
          color: '#29271b',
        },
      });

      // Redirect to the signin page
      navigate("/signin");
    } catch (err) {
      setLoading(false);

      // Check if the error message contains the duplicate key error
      if (err.message.includes("duplicate key error collection")) {
        console.log(err.message);
      } else {
        // Show a generic error message for other errors
        console.log(err.message);
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center  bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]'>
      <div className='bg-white rounded-2xl my-8 mx-4 p-8 shadow-xl w-full max-w-md'>
        <h2 className='text-3xl font-extrabold text-center mb-6 text-[#a89a49]'>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-gray-600 text-sm mb-2'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username || ""}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#a89a49]'
              placeholder='Enter your username'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-600 text-sm mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email || ""}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#a89a49]'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-gray-600 text-sm mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password || ""}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#a89a49]'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className={`w-full my-text bg-[#e9dc6d] my-text   font-bold text-slate-600 hover:bg-[#c4b852] py-2 px-4 rounded-md focus:outline-none ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#a89a49]"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Already have an account?{" "}
          <Link to='/signin' className='text-[#6b6129] hover:underline'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
