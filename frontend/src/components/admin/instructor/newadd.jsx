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
        axios.post("http://localhost:5000/api/admin/addinstructor", values)
          .then((response) => {
            console.log(response);
            message.success("Instructor successfully added");
            hideForm();
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
            message.error("Failed to add instructor");
          });
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
      });
  };

  return (
    <>
      <div className="text-2xl">Add New Instructor</div>
      <div className="w-full h-[100px] flex items-center pl-5">
        <Button
          type="primary"
          style={{ backgroundColor: "#1677FF" }}
          onClick={showForm}
        >
          Add New
        </Button>
      </div>

      <Modal
        title="Add New Instructor"
        visible={formVisible}
        onOk={handleFormSubmit}
        onCancel={hideForm}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[
              { required: true, message: "Please enter the contact number" },
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
