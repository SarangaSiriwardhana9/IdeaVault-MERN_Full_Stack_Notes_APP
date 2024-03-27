import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { PiNoteDuotone } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import logo from '/logo.png';

export default function SidePanel() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth >= 768); // Adjusted condition for menu visibility
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 w-64`}>
          <div className="flex justify-between items-center p-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-start p-4">
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className="w-16 h-16 rounded-full mb-4" />
            ) : (
              <Link to="/signin" className="mb-4"><FaUserCircle className="w-8 h-8" /> Sign In</Link>
            )}
            <Link to="/" className="mb-4 flex items-center"><IoHome className="mr-2" />Home</Link>
            <hr className='m-2'/>
            <Link to="/profile" className="mb-4 flex items-center"><FaUserCircle className="mr-2" />Profile</Link>
            <hr className='m-2'/>
            <Link to="/createnote" className="mb-4 flex items-center"><GiNotebook className="mr-2" />Create Note</Link>
            <hr className='m-2'/>
            <Link to="/mynotes" className="mb-4 flex items-center"><PiNoteDuotone className="mr-2" />My Notes</Link>
            <hr className='m-2'/>
            <Link to="/about" className="mb-4 flex items-center"><IoIosPeople className="mr-2" />About</Link>
            <button onClick={handleSignOut} className="mt-4">Logout</button>
          </div>
        </div>
      )}
      {!isMenuOpen && (
        <div className="fixed top-0 left-0 bg-gray-900 text-white p-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
