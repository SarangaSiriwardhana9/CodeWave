import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';

const FormComponent = () => {
  const onFinish = (values) => {
    // Make a POST request to your login API endpoint
    axios.post('http://localhost:5000/api/auth/login', values)
      .then((response) => {

        if (response.data.role === 'student') {
          message.success('Login successful');
          sessionStorage.setItem('userId', response.data._id);
          sessionStorage.setItem('userFname', response.data.firstname);
          sessionStorage.setItem('userLName', response.data.lastname);
          window.location.href = '/student/dashboard';
        } else if (response.data.role === 'admin') {
          message.success('Login successful');
          window.location.href = '/admin/dashboard'; 
        } else if (response.data.role === 'instructor') {
          message.success('Login successful');
          sessionStorage.setItem('userId', response.data._id);
          sessionStorage.setItem('userFname', response.data.firstname);
          sessionStorage.setItem('userLName', response.data.lastname);
          sessionStorage.setItem('userEmail', response.data.email);
          const instructorDashboardURL = `/instructor/dashboard/${response.data.email}`;
          window.location.href = instructorDashboardURL;
        } else {
          message.error('Login failed.');
        } 
      })
      .catch((error) => {
        console.error(error);
        message.error('Login failed. Please check your credentials.');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full py-2 pr-16">
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
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish} // Specify the callback for form submission
        onFinishFailed={onFinishFailed} // Specify the callback for failed submissions
      >
        <Form.Item
          label="Email" // Change the label to "Email"
          name="email" // Change the name to "email"
          rules={[
            {
              required: true,
              message: 'Please input your email!', // Update the error message
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
          <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#4096FF' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComponent;
