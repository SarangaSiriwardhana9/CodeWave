import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { message } from 'antd';

const onFinish = (values) => {
  // Check if passwords match
  if (values.password !== values.confirmPassword) {
    message.error('Passwords do not match');
    return;
  }

  // Set the 'role' field here
  values.role = 'student';

  // Make a POST request to the registration URL
  axios
    .post('http://localhost:5000/api/auth/register', values)
    .then((response) => {
      console.log('Registration success:', response.data);
      message.success('Registration successful');
      window.location.href = '/login';
    })
    .catch((error) => {
      console.error('Registration failed:', error.response.data);
      message.error(error.response.data.message);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const FormComponent = () => {
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
          display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" style={{width:"100%", backgroundColor: "#4096FF"}}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComponent;
