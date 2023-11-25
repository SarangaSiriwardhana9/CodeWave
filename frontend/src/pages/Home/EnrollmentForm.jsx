import Layout from 'antd/es/layout/layout';
import React, { useState } from 'react';

const EnrollmentForm = ({ onEnrollmentSubmit }) => {
  const [enrollmentKey, setEnrollmentKey] = useState('');

  const handleEnrollmentKeyChange = (e) => {
    setEnrollmentKey(e.target.value);
  };

  const handleFormSubmit = () => {
    // Call the provided callback function to handle enrollment key submission
    onEnrollmentSubmit(enrollmentKey);
  };

  return (
    <Layout>
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold">Enter Enrollment Key</h2>
      <div className="flex space-x-2">
        <input
          className="w-64 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          placeholder="Enter Enrollment Key"
          value={enrollmentKey}
          onChange={handleEnrollmentKeyChange}
        />
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default EnrollmentForm;
