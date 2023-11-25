import React, { useEffect, useState } from "react";
import { Select, Space, Progress } from "antd";
import axios from "axios";

const Status = () => {
  const [labData, setLabData] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labCapacity, setLabCapacity] = useState(null);
  const [attendedCount, setAttendedCount] = useState(0);

  const handleChange = (value) => {
    setSelectedLab(value);
    const selectedLabData = labData.find((lab) => lab._id === value);
    if (selectedLabData) {
      setLabCapacity(selectedLabData.capacity);
    }
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    // Fetch lab data based on the user's email from session
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
      axios
        .get(`http://localhost:5000/api/labroom/getall/${userEmail}`)
        .then((response) => {
          const labData = response.data;
          setLabData(labData);
        })
        .catch((error) => {
          console.error("Error fetching lab data:", error);
        });
    }
  }, []);

  useEffect(() => {
    // Fetch attended count based on the selected lab
    if (selectedLab) {
      axios
        .get(
          `http://localhost:5000/api/instructor/enrolled/count/${selectedLab}`
        )
        .then((response) => {
          const attendedStudents = response.data;
          setAttendedCount(attendedStudents.length);
        })
        .catch((error) => {
          console.error("Error fetching attended count:", error);
        });
    }
  }, [selectedLab]);

  const completionPercentage = (attendedCount / labCapacity) * 100 || 0;

  return (
    <div className="w-1/2 border px-5 py-4 flex flex-col gap-4 pl-10 rounded-md shadow-md">
      <div className="text-xl text-primary font-semibold">
        Lab Attendance Status
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
            >
              {labData.map((lab) => (
                <Select.Option key={lab._id} value={lab._id}>
                  {lab.name}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>
        <div>
          <Space wrap>
            <Progress
              type="dashboard"
              percent={completionPercentage}
              gapDegree={30}
              strokeWidth={10}
            />
          </Space>
        </div>
        {labCapacity && (
          <div>
            Lab Capacity: <strong>{labCapacity}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
