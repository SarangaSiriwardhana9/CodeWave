import React, { useState } from "react";
import Layout from "./layout";
import Enrollment from "../../components/student/Enrollment";
import LabTable from "../../components/student/LabTable";

const Dashboard = () => {
  
  return (
    <Layout>
      <div className="pl-2 top-0 right-0 bottom-0 flex grow flex-col border gap-5">
        <div className="w-full text-2xl font-semibold ">Sudent Dashboard</div>
        <Enrollment />
        <div className="w-full px-4">
         <LabTable />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
