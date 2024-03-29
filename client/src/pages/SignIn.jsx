// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import '../Font.css'

import { toast } from 'react-toastify';



export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  console.log(loading, error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(signInStart());
        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success === false) {
            dispatch(signInFailure(data));
            toast.error(data.message || "Sign in failed"); // Show error toast if sign in fails
        } else {
            dispatch(signInSuccess(data));
            toast.success("Sign in successful!", {
              autoClose: 2000,
              theme: "colored",
              //colour yellow
              style: {
                backgroundColor: '#fff4c2',
                color: '#29271b',
              },
            });
            setTimeout(() => {
              navigate('/');
          }, 1000);
            
        }
    } catch (error) {
        dispatch(signInFailure(error));
        toast.error(error.message || "Something went wrong"); // Show error toast if an unexpected error occurs
    }
};

  return (
    <div className='min-h-screen flex items-center justify-center  bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]'>
      <div className='bg-white rounded-2xl my-8 mx-4 p-8 shadow-xl w-full max-w-md'>
        <h2 className='my-text text-4xl font-extrabold text-center mb-6 text-[#a89a49]'>
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
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
            className={`w-full bg-[#e9dc6d] my-text   font-bold text-slate-600 py-2 px-4 rounded-md focus:outline-none hover:opacity-95 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#c4b852]"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Dont have an account?{" "}
          <Link to='/signup' className='text-[#5e5721]  hover:underline'>
            Sign Up
          </Link>
        </p>
        <p className='text-red-700 mt-5 text-center'>
          {error ? error.message || "Something went wrong. ." : ""}
        </p>
      </div>
    </div>
  );
}
