import React from "react";
import Layout from "../Admin/layout";
import Table from "../../components/admin/instructor/table";
import NewAdd from "../../components/admin/instructor/newadd";

const Dashboard = () => {
  return (
    <Layout>
      <div className="w-full px-10 my-5 flex-col flex justify-center gap-5">
        <div className="w-full py-2 px-10 flex-col">
          <div className="text-2xl ">Instructor Management Panel</div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="border rounded-3xl w-full py-2 px-10 flex-col shadow-lg">
            <Table />
          </div>
          <div className="border rounded-3xl  w-full py-2 px-10 flex-col">
            <NewAdd />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
