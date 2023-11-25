import React from 'react';
import './InstructorSidebar.css';

const InstructorSidebar = () => {
  return (
    <div className="sidebar-container ">
      <h1 className="dashboard-title" style={{ fontFamily: 'sans-serif'}}>
  Lecture Dashboard
</h1>
      <div className="profile-container">
        <div className="profile-circle">
          <i className="fas fa-user-circle text-white"></i>
        </div>
      </div>
      
      <ul className="menu-list">
        <li>
          <a href="/">
            <i className="fas fa-home"></i> Home
          </a>
        </li>
        <li>
          <a href="/about">
            <i className="fas fa-info-circle"></i> About Us
          </a>
        </li>
        <li>
          <a href="/settings">
            <i className="fas fa-cog"></i> Settings
          </a>
        </li>
        <li>
          <a href="/contact">
            <i className="fas fa-phone"></i> Contact Us
          </a>
        </li>
        <li>
          <a href="/logout">
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default InstructorSidebar;
