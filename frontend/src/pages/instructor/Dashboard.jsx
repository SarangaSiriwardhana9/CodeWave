import React, { useState, useEffect } from "react";
import Layout from "./layout";
import LabTable from "../../components/instructor/labtable";
import { useParams } from "react-router-dom";
import Status from "../../components/instructor/Status";
import CompleteStatus from "../../components/instructor/CompleteStatus";

const Dashboard = () => {
  const { email } = useParams();
  const [labNames, setLabNames] = useState([]);

  const handleLabNamesChange = (labs) => {
    const names = labs.map((lab) => lab.name);
    setLabNames(names);

    // Store labNames in sessionStorage
    sessionStorage.setItem("labNames", JSON.stringify(names));
  };

  useEffect(() => {
    // Retrieve labNames from sessionStorage on component mount
    const storedLabNames = sessionStorage.getItem("labNames");
    if (storedLabNames) {
      const parsedLabNames = JSON.parse(storedLabNames);
      setLabNames(parsedLabNames);
    }
  }, []);

  return (
    <Layout>
      <div className="pl-2 top-0 right-0 bottom-0 flex grow flex-col border gap-5">
        <div className="w-full text-2xl font-semibold ">
          Instructor Dashboard
        </div>
        <div className="w-full py-2 px-4 flex items-center justify-evenly gap-4">
          <Status />
          <CompleteStatus />
        </div>
        <div className="w-full px-10">
          <LabTable userEmail={email} onLabNamesChange={handleLabNamesChange} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
