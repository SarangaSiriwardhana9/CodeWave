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
        axios.post("http://localhost:5000/api/auth/register", {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          role: "student",
        })
          .then((response) => {
            console.log(response);
            message.success("Student successfully registered");
            hideForm();
            // You might want to handle the page navigation after successful registration
          })
          .catch((error) => {
            console.error(error);
            message.error("Failed to register student");
          });
      })
      .catch((errorInfo) => {
        console.error(errorInfo);
      });
  };

  return (
    <>
      <div className="text-2xl">Register New Student</div>
      <div className="border w-full h-[100px] flex items-center pl-5">
        <Button
          type="primary"
          style={{ backgroundColor: "#1677FF" }}
          onClick={showForm}
        >
          Register New Student
        </Button>
      </div>

      <Modal
        title="Register New Student"
        visible={formVisible}
        onOk={handleFormSubmit}
        onCancel={hideForm}
        okText="Register"
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
        </Form>
      </Modal>
    </>
  );
};

export default NewAdd;
