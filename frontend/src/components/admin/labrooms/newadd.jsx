import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, message } from "antd";

const NewAdd = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [form] = Form.useForm();

  const showForm = () => {
    setFormVisible(true);
  };

  const hideForm = () => {
    setFormVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = () => {
    form.validateFields()
      .then((values) => {
        axios.post("http://localhost:5000/api/admin/createnew", values)
          .then((response) => {
            console.log(response);
            message.success("Course successfully created");
            hideForm();
            window.location.reload(); // Reload the page to reflect the new data
          })
          .catch((error) => {
            console.error(error);
            message.error("Failed to create course");
          });
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
      });
  };

  return (
    <>
      <div className="text-2xl">Create New Course</div>
      <div className="w-full h-[100px] flex items-center pl-5">
        <Button
          type="primary"
          style={{ backgroundColor: "#296F9D" }}
          onClick={showForm}
        >
          Create New
        </Button>
      </div>
 
      <Modal
        title="Create New Course"
        visible={formVisible}
        onOk={handleFormSubmit}
        onCancel={hideForm}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Course Name"
            rules={[{ required: true, message: "Please enter the course name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="instructoremail"
            label="Instructor Email"
            rules={[
              { required: true, message: "Please enter the instructor's email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewAdd;
