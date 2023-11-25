import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./InstructorSidebar";
import Header from "./Header";
import CardOne from "./cardOne";
import CardTwo from "./cardTwo";

// Import your background image
import backgroundImage from "../assets/bg.jpg";
import Labtable from "../components/instructor/labtable";

const InstructorDashboard = () => {
  const { email } = useParams();
  return (
    <div
      className="flex"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar />
      <div className="flex-grow p-4 mt-5">
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md h-48">
            <CardOne /> {/* Include the CardOne component here */}
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md h-48">
            <CardTwo />
          </div>
        </div>

        {/* Third Card (larger) */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          {/* Add content for the larger third card here */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4  px-5">
            {" "}
            {/* Adjust the height using h-xx */}
            <Labtable userEmail={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
