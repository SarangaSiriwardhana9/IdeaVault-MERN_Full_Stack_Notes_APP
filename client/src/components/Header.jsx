/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '/logo.png';
import { IoHome } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { PiNoteDuotone } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa";
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
    <header className="py-1 bg-gradient-to-r from-[rgb(248,240,230)] via-[#eed08f] to-[#ffd884] " >
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="flex items-center">
          <img src={logo} alt="Logo" className=" px-2 h-16 " />
        </Link>
        {currentUser ? (
          <nav className="flex items-center ">
            
            <div className="relative px-4 flex">
              <button>
                {currentUser ? (
               <img
               src={currentUser.profilePicture}
               alt='profile'
               className="w-11 h-10 -mr-2 rounded-full shadow-md border-2 border-white"
             />
                ) : (
                  <span className="text-white">Sign In</span>
                )}
              </button>
            </div>
            <div ref={menuRef} className="relative">
              <button onClick={toggleMenu} className="bg-[#fdffdc] py-1 rounded-xl me-2 hover:bg-[#f1f5a9] shadow-md">
                <GiHamburgerMenu className="m-2 mx-2"/>
              </button>
              {isMenuOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end  rounded-xl  z-50" onClick={closeMenu}>
                  <div className=" w-52 bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7] items-center justify-center rounded-r-lg shadow-lg">
                    
                    <Link 
                      to='/'
                      onClick={closeMenu}
                      className=" flex m-2 mt-6 flex-row px-4 py-2 text-lg  text-gray-800 hover:bg-[#faffad]"
                    >
                      <IoHome className='mt-1  mr-2'/>Home
                    </Link>
                    <hr className="text-slate-800" />
                    
                    <Link
                      to='/profile'
                      onClick={closeMenu}
                      className=" w-full m-2 flex flex-row text-lg text-left px-4 py-2 text-gray-800 hover:bg-[#faffad]"
                    >
                      <FaUserCircle className='mt-1 mr-2'/>
                      
                      Profile
                    </Link>
                    <hr className="text-slate-800" />
                    <Link
                      to='/createnote'
                      onClick={closeMenu}
                      className=" w-full m-2 flex text-lg flex-row text-left px-4 py-2 text-gray-800 hover:bg-[#faffad]"
                    >
                      <GiNotebook className='mt-1 mr-2'/>
                      Create Note
                    </Link>
                    <hr className="text-slate-800" />
                    <Link
                      to='/mynotes'
                      onClick={closeMenu}
                      className=" w-full m-2 flex text-lg flex-row text-left px-4 py-2 text-gray-800 hover:bg-[#faffad]"
                    >
                      <PiNoteDuotone className='mt-1 mr-2'/>
                      My Notes
                    </Link>
                    <hr className="text-slate-800" />
                    <Link

                      to='/about'
                      onClick={closeMenu}
                      className=" w-full m-2 flex text-lg flex-row text-left px-4 py-2 text-gray-800 hover:bg-[#faffad]"
                    >
                      <IoIosPeople className='mt-1 mr-2'/>
                      About
                    </Link>
                    <hr className="text-slate-800" />
                  
                    <button onClick={handleSignOut} className="block w-full m-2 flex text-lg flex-row text-left px-4 py-2 text-gray-800 hover:bg-[#ffb99d]">
                      <FaPowerOff className='mt-1 mr-2'/>
                      Logout
                    </button>

                   
                    
                    
                  </div>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <div className="flex space-x-4">
           {/* responsive button for signup and sign in */}
           <Link
  to='/signup'
  className="hidden sm:inline-block bg-[#fcefa4] hover:bg-[#fffeb4]  shadow-sm text-slate-600 sm:py-1 sm:px-2 font-bold py-2 px-4 rounded-xl"
>
  Sign Up
</Link>

<Link
  to='/signin'
  className="bg-[#ffef94] hover:bg-[#fffeb4] shadow-sm text-slate-600 font-bold py-2 px-4 sm:py-1 sm:px-2 rounded-xl"
>
  Sign In
</Link>
          </div>
        )}
      </div>
    </header>
  );
}
