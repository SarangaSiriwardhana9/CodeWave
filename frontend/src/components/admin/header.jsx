import React from 'react'
import { LogoutOutlined } from '@ant-design/icons';

const  Header = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove the token from localStorage
        window.location.href = '/login'; // Redirect to the login page
      };
  return (
    <div className="w-full h-[50px] bg-slate-800 flex justify-between px-10">
         <div className="h-full font-semibold flex items-center text-white text-lg">
            Admin Panel
         </div>
         <div className="h-full flex items-center">
           <LogoutOutlined
             style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}
             onClick={handleLogout} // Call handleLogout when the button is clicked
           />
         </div>
      </div>
  )
}

export default Header
