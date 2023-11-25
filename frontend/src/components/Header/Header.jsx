import React from 'react';

const Header = () => {
  return (
    <div className="bg-gray-200 shadow-md rounded-t-lg w-full flex justify-between items-center p-5">
      <div className="text-lg font-bold text-gray-800">
        CODEWAVE
      </div>
      <nav>
        {/* Navigation Links */}
        <a href="/" className="text-white text-lg no-underline hover:underline ml-4">
          {/* Add your navigation link text here */}
        </a>
        {/* Add more navigation links as needed */}
      </nav>
    </div>
  );
};

export default Header;
