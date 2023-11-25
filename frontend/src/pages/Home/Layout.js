// Layout.js

import React from 'react';
import Header from '../../components/Header/Header';

const Layout = ({ children }) => {
  return (
    <div>
      {/* Include the Header component */}
      <Header />

      {/* Render the content of the webpage */}
      <main className="container mx-auto mt-16 p-4">
        {children}
      </main>

      {/* You can add a footer here if needed */}
    </div>
  );
};

export default Layout;
