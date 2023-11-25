import React, { useEffect, useState } from "react";
import Layout from "../Admin/layout";
import axios from "axios";

function Dashboard() {
  const [userCounts, setUserCounts] = useState([]);
  const [labroomCount, setLabroomCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/getusercount")
      .then((response) => {
        setUserCounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:5000/api/admin/getlabroomcount")
      .then((response) => {
        // Extract the labroom count from the response data
        const labroomCount = response.data.count;
        setLabroomCount(labroomCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Create a function to extract the count based on the type
  const getCountByType = (type) => {
    const userCount = userCounts.find((count) => count._id === type);
    return userCount ? userCount.count : 0;
  };

  return (
    <Layout>
      <div className="w-full border px-10 my-5 flex-col flex justify-center">
        <div className="border w-full py-2 px-10 flex justify-evenly">
          <div className="border p-5 flex-col justify-center items-center rounded-lg drop-shadow-xl">
            <div className="w-full text-lg font-semibold">No. Instructors</div>
            <div className="w-full flex text-3xl justify-center font-bold">
              {getCountByType("instructor")}
            </div>
          </div>
          <div className="border p-5 flex-col justify-center items-center rounded-lg drop-shadow-xl">
            <div className="w-full text-lg font-semibold">No. Students</div>
            <div className="w-full flex text-3xl justify-center font-bold">
              {getCountByType("student")}
            </div>
          </div>
          <div className="border p-5 flex-col justify-center items-center rounded-lg drop-shadow-xl">
            <div className="w-full text-lg font-semibold">No. Labrooms</div>
            <div className="w-full flex text-3xl justify-center font-bold">
              {labroomCount}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
