// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    /* responsive hedder that including logo  home page, about page Sign in button */
    <header className='text-gray-600 bg-slate-300 body-font'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link
          to='/'
          className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
        >
          <span className='ml-3 text-xl'>Home</span>
        </Link>
        <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
          <Link to='/about' className='mr-5 hover:text-gray-900'>
            About
          </Link>
          <Link to='/profile' className='mr-5 hover:text-gray-900'>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt='profile'
                className='h-7 w-7 rounded-full object-cover'
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
