import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase-config";
import { Select, Table, Button } from "antd";
import Layout from "../instructor/layout";

const { Option } = Select;

const ViewAssignment = () => {
  const [pdfList, setPdfList] = useState([]); // List of PDFs
  const [loading, setLoading] = useState(false);
  const [labNames, setLabNames] = useState([]); // Lab names from session storage


  // Fetch lab names from session storage
  const fetchLabNames = () => {
    const storedLabNames = sessionStorage.getItem("labNames");
    if (storedLabNames) {
      const parsedLabNames = JSON.parse(storedLabNames);
      setLabNames(parsedLabNames);
    }
    };
    
    useEffect(() => {
        fetchLabNames();
    }, []);

  // Function to fetch PDFs based on selected lab name
  const fetchPDFs = (lab) => {
    const labfle = lab;
    setLoading(true);
    console.log("Fetching PDFs for lab:",labfle);

    const folderPath = `files/${lab}`; // Use the selected labName
    const storageRef = ref(storage, folderPath);

    listAll(storageRef)
      .then((result) => {
        const promises = result.items.map(async (itemRef) => {
          const downloadURL = await getDownloadURL(itemRef);
          const fileName = itemRef.name;
          const [sname, labname, date] = fileName.split("_");
          return { sname, labname, date, downloadURL };
        });
        Promise.all(promises).then((data) => {
          setPdfList(data);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error getting download URLs:", error);
      });
  };

  // Function to handle lab selection change
  const handleLabChange = (value) => {
    console.log(`Selected lab: ${value}`);
    fetchPDFs(value);
  };

  // Columns for the PDF table
  const columns = [
    {
      title: "Student Name",
      dataIndex: "sname",
      key: "sname",
    },
    {
      title: "Lab Name",
      dataIndex: "labname",
      key: "labname",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Download",
      key: "download",
      render: (text, record) => (
        <div className="w-full flex justify-center items-center">
          <Button
            type="primary"
            onClick={() => window.open(record.downloadURL)}
            style={{
              width: "50%",
              backgroundColor: "#296F9D",
              height: "30px",
              fontSize: "1em",
            }}
          >
            Download
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col w-full gap-5">
        <div className="text-2xl font-semibold text-primary">
          Download Lab Assignments
        </div>
        <Select
          style={{ width: 200, marginBottom: 16 }}
          placeholder="Select Lab"
          onChange={handleLabChange}
        >
          {labNames.map((name) => (
            <Option key={name} value={name}>
              {name}
            </Option>
          ))}
        </Select>
        <div className="w-full px-10 py-2 ">
          <Table
            columns={columns}
            dataSource={pdfList.map((item, index) => ({
              key: index,
              sname: item.sname,
              labname: item.labname,
              date: item.date,
              downloadURL: item.downloadURL,
            }))}
            loading={loading}
            style={{ borderRadius: "10px", border: "1px solid #e8e8e8" }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ViewAssignment;
