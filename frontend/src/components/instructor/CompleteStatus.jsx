import React, { useState, useEffect } from "react";
import { Progress, Space, Select } from "antd";
import axios from "axios";

const CompleteStatus = () => {
  const [labNames, setLabNames] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labCapacity, setLabCapacity] = useState(null);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [pendingPercentage, setPendingPercentage] = useState(0);

  const handleChange = (value) => {
    setSelectedLab(value);
    const selectedLabData = labNames.find((lab) => lab.value === value);
    if (selectedLabData) {
      setLabCapacity(selectedLabData.capacity);
      // Fetch student count for the selected lab
      axios
        .get(`http://localhost:5000/api/instructor/enrolled/count/${value}`)
        .then((response) => {
          const studentCount = response.data.length;
          // Calculate completed and pending percentages
          const completedCount = response.data.filter(
            (student) => student.status === "completed"
          ).length;
          const pendingCount = studentCount - completedCount;
          setCompletedPercentage((completedCount / studentCount) * 100);
          setPendingPercentage((pendingCount / studentCount) * 100);
        })
        .catch((error) => {
          console.error("Error fetching student count:", error);
        });
    }
  };

  useEffect(() => {
    // Fetch lab names based on the user's email from session
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
      axios
        .get(`http://localhost:5000/api/labroom/getall/${userEmail}`)
        .then((response) => {
          const labData = response.data;
          const names = labData.map((lab) => ({
            value: lab._id,
            label: lab.name,
            capacity: lab.capacity,
          }));
          setLabNames(names);
        })
        .catch((error) => {
          console.error("Error fetching lab names:", error);
        });
    }
  }, []);

  return (
    <div className="w-1/2 border px-5 py-4 flex flex-col gap-4 pl-10 rounded-md shadow-md">
      <div className="text-xl text-primary font-semibold">
        Lab Completion Status
      </div>
      <div className="flex flex-row items-center gap-16">
        <div>
          <Space wrap>
            <Select
              defaultValue="Select Lab"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={labNames}
            />
          </Space>
        </div>
        <div>
          <Space wrap>
            {labCapacity && (
              <div>
                Lab Capacity: <strong>{labCapacity}</strong>
              </div>
            )}
            <Progress
              type="circle"
              percent={pendingPercentage}
              strokeColor = "#facc15"
              format={() => "Pending"}
              strokeWidth={10}
            />
            <Progress
              type="circle"
              strokeColor = "#52c41a"
              percent={completedPercentage}
              format={() => "Done"}
              strokeWidth={10}
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default CompleteStatus;
