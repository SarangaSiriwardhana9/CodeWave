import React from "react";
import Header from "../../components/admin/header";
import Sidepanle from "../../components/admin/sidepanle";

const Layout = ({ children }) => {
  return (
    <>
      <div className="w-full h-full flex-col">
        <Header />
        <div className="w-full flex h-full pl-2 py-3 pr-5 gap-5">
          <Sidepanle />
          <div className="border grow shrink">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
