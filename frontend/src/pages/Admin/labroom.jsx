import React from 'react'
import Layout from "../Admin/layout";
import Table from "../../components/admin/labrooms/table";
import AddNew from "../../components/admin/labrooms/newadd";
const labroom = () => {
  return (
    <Layout>
           <div className="w-full px-5 my-5 flex-col flex justify-center">
               <div className=" w-full py-2 px-10 flex-col">
                  <div className="text-2xl ">Lab Room Management Panel</div>
               </div>
               <div className="flex flex-col gap-5">
               <div className="border rounded-3xl shadow-lg w-full py-2 flex-col">
                  <Table/>
               </div>
               <div className="border rounded-lg  w-full py-2 px-10 flex-col">
                   <AddNew/>
               </div>

               </div>
          </div>
      </Layout>
  )
}

export default labroom
