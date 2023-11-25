import React, { useState } from "react";
import Sidebar from "./Sidebar";
import StudentAttempetTable from "./StudentAttempetTable";

const Sbody = () => {
  const [enrollmentKey, setEnrollmentKey] = useState(""); // State to store the enrollment key

  const handleInputChange = (e) => {
    // Update the enrollmentKey state when the input value changes
    setEnrollmentKey(e.target.value);
  };

  const handleButtonClick = () => {
    // Navigate to the new URL with the enrollment key as a parameter
    window.location.href = `/studnetlabroom/${enrollmentKey}`;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="md:w-2/3 p-4">
        {/* Enrollment Card - Top Center */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-2/3">
            <h2 className="text-2xl font-semibold mb-2">
              Enter Enrollment Key
            </h2>
            <div className="flex">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-l-md flex-grow focus:outline-none focus:border-blue-500"
                placeholder="Enter key"
                value={enrollmentKey}
                required
                onChange={handleInputChange} // Update the state on input change
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
                onClick={handleButtonClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Second Card - Professional Styling */}
        <div className="bg-white rounded-lg shadow-lg p-4 mt-20 ml-28">
          <StudentAttempetTable />
        </div>
      </div>
    </div>
  );
};

export default Sbody;
