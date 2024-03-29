import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-500"></div>
    </div>
  );
};

export default Loader;
