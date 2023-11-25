import React from "react";
import Sidebar from "../../instructorDashboard/InstructorSidebar";
import Dataform from "../../components/instructor/Dataform";
import Viewpdf from "../../components/instructor/Viewpdf";
const ViewLab = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="flex w-full flex-col gap-5">
        <div className="flex-grow p-4 my-5 w-full rounded-md">
          <Dataform />
        </div>
        <div className="flex-grow p-4 my-5 w-full rounded-md">
          <Viewpdf />
        </div>
      </div>
    </div>
  );
};

export default ViewLab;
