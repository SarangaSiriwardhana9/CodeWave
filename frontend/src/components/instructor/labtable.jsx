import React, { useState, useEffect } from "react";
import { Space, Table, Button, Drawer, Form, Input, message } from "antd";
import dayjs from "dayjs";

const { Column } = Table;

const LabTable = ({ userEmail, onLabNamesChange }) => {
  const [labrooms, setLabrooms] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedLabroom, setSelectedLabroom] = useState(null);
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const [newStepsInput, setNewStepsInput] = useState("");

  
  useEffect(() => {
    fetchLabrooms();
  }, [userEmail]);

  const fetchLabrooms = () => {
    const apiUrl = `http://localhost:5000/api/labroom/getall/${userEmail}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLabrooms(data);
        onLabNamesChange(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showViewModal = (record) => {
    setSelectedLabroom(record);
    setViewModalVisible(true);
  };

  const hideViewModal = () => {
    setSelectedLabroom(null);
    setViewModalVisible(false);
  };

  const showUpdateForm = (record) => {
    setUpdatedData(record);
    setUpdateFormVisible(true);
  };

  const hideUpdateForm = () => {
    setUpdatedData(null);
    setUpdateFormVisible(false);
  };

  const handleFormSubmit = (values) => {
    const apiUrl = `http://localhost:5000/api/labroom/update/${updatedData._id}`;

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          message.success("Labroom updated successfully");
          hideUpdateForm();
          fetchLabrooms();
        } else {
          message.error("Labroom update failed. Please try again later.");
        }
      })
      .catch((error) => {
        console.error(error);
        message.error("Labroom update failed. Please try again later.");
      });
  };

  const handleNewStepsInputChange = (e) => {
    setNewStepsInput(e.target.value);
  };

  const addNewSteps = () => {
    const newStepsArray = newStepsInput
      .split(",")
      .map((step) => step.trim())
      .filter((step) => step !== "");

    if (newStepsArray.length + updatedData.step.length <= 20) {
      setUpdatedData((prevData) => ({
        ...prevData,
        step: [...prevData.step, ...newStepsArray],
      }));
      setNewStepsInput("");
    } else {
      message.error("Maximum number of steps (20) exceeded.");
    }
  };

  return (
    <div className="w-full rounded-lg border py-5">
      <Table dataSource={labrooms}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Date"
          key="labdate"
          render={(text, record) => (
            <div className="flex flex-col gap-4">
              {dayjs(record.labdate).format("YYYY-MM-DD")}
            </div>
          )}
        />
        <Column title="Capacity" dataIndex="capacity" key="capacity" />
        <Column
          title="Enrollemnt"
          dataIndex="enrollmentkey"
          key="enrollmentkey"
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                style={{ backgroundColor: "#dcfce7", color: "#296F9D" }}
                onClick={() => showViewModal(record)}
              >
                View
              </Button>
              <Button
                style={{ backgroundColor: "#296F9D", color: "#ffffff" }}
                onClick={() => showUpdateForm(record)}
              >
                Update
              </Button>
            </Space>
          )}
        />
      </Table>

      <Drawer
        title="Labroom Details"
        visible={viewModalVisible}
        onClose={hideViewModal}
        width={800}
      >
        {selectedLabroom && (
          <div className="flex flex-col gap-4">
            <p>
              <span className="font-semibold text-lg">Name:</span>{" "}
              {selectedLabroom.name}
            </p>
            <p>
              <span className="font-semibold text-lg">Description:</span>{" "}
              {selectedLabroom.description}
            </p>
            <p>
              <span className="font-semibold text-lg">Capacity:</span>{" "}
              {selectedLabroom.capacity}
            </p>
            <p>
              <span className="font-semibold text-lg">Enrollment Key:</span>{" "}
              {selectedLabroom.enrollmentkey}
            </p>
            <p>
              <span className="font-semibold text-lg">Instructor Name:</span>{" "}
              {selectedLabroom.instructorname}
            </p>
            <p>
              <span className="font-semibold text-lg">Instructor Email:</span>{" "}
              {selectedLabroom.instructoremail}
            </p>
            <p>
              <span className="font-semibold text-lg">Lab Date:</span>{" "}
              {dayjs(selectedLabroom.labdate).format("YYYY-MM-DD")}
            </p>
            <p>
              <span className="font-semibold text-lg">Meeting Link:</span>{" "}
              {selectedLabroom.meetinglink}
            </p>
            <p>
              <span className="font-semibold text-lg">Steps:</span>
            </p>
            <ol className="list-decimal ml-5">
              {selectedLabroom.step.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </Drawer>

      <Drawer
        title="Update Labroom"
        open={isUpdateFormVisible}
        onClose={hideUpdateForm}
        width={800}
      >
        {updatedData && (
          <Form
            name="updateLabroomForm"
            onFinish={handleFormSubmit}
            initialValues={updatedData}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input labroom name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Enrollment Key"
              name="enrollmentkey"
              rules={[
                {
                  required: true,
                  message: "Please input labroom enrollment key!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input labroom description!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[
                {
                  required: true,
                  message: "Please input labroom capacity!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Instructor Name"
              name="instructorname"
              rules={[
                {
                  required: true,
                  message: "Please input labroom instructor name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* labdate */}
            <Form.Item
              label="Date"
              name="labdate"
              rules={[
                {
                  required: true,
                  message: "Please input labroom date!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Meeting Link Can be added later"
              name="meetinglink"
              rules={[
                {
                  required: false,
                  message: "Please input labroom meeting link!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {updatedData.step.map((step, index) => (
              <Form.Item
                key={index}
                label={`Step ${index + 1}`}
                name={["step", index]} // Set the name to an array path
                rules={[
                  {
                    required: true,
                    message: "Please input a step!",
                  },
                ]}
              >
                <Input placeholder={`Step ${index + 1}`} />
              </Form.Item>
            ))}

            <Form.Item>
              <div className="flex flex-row gap-4">
                <Input
                  placeholder="Add new steps"
                  value={newStepsInput}
                  onChange={handleNewStepsInputChange}
                />
                <Button onClick={addNewSteps}>Add</Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#296F9D",
                  height: "40px",
                  fontSize: "1.4em",
                }}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default LabTable;
