import React from "react";
import Layout from "../Admin/layout";
import Table from "../../components/admin/students/table";
import AddNew from "../../components/admin/students/newadd";
const Dashboard = () => {

    return (
      <Layout>
           <div className="w-full px-10 my-5 flex-col flex justify-center gap-5">
               <div className="w-full py-2 px-10 flex-col">
                  <div className="text-2xl ">Student Management Panel</div>
               </div>
               <div className="flex flex-col gap-5">
               <div className="border rounded-3xl shadow-lg w-full py-2 px-10 flex-col">
                    <Table />
               </div>
               <div className="border rounded-3xl w-full py-2 px-10 flex-col">
                   <AddNew/>
               </div>
               </div>
          </div>
      </Layout>
    );
  }
  
  export default Dashboard;
