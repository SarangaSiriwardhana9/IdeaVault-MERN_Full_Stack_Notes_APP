/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '/logo.png';
import bg from "/bfyellow2.jpg";
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Sign out user
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.href = '/signin';
    } catch (error) {
      const data = error.response.data;
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    //bg-[#fffae8]
    <header className="py-4 bg-gradient-to-r from-[rgb(255,253,240)] via-[#fcfda0] to-[#f3ba6e]" >
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="flex items-center">
          <img src={logo} alt="Logo" className=" px-8 h-16 -m-2" />
          
        </Link>
        {currentUser ? (
          <nav className="flex items-center space-x-4">
            <Link to='/about' className="text-slate-600">
              About
            </Link>
            <div ref={menuRef} className="relative px-8 ">
              <button
                onClick={toggleMenu}
                className="focus:outline-none"
              >
                {currentUser ? (

                  <img
                    src={currentUser.profilePicture}
                    alt='profile'
                    className=" w-10 h-10 rounded-full"
                  />
                ) : (
                  <span className="text-white">Sign In</span>
                )}
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2  w-28 bg-[#fffae8] rounded-lg shadow-lg">
                  <Link
                    to='/profile'
                    onClick={closeMenu}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <div className="flex space-x-4">
            <Link to='/signup' className="text-white">
              Sign Up
            </Link>
            <Link to='/signin' className="text-white">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
