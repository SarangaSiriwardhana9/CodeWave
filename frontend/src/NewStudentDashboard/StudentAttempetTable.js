import React from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Lab Name',
    dataIndex: 'labName',
    key: 'labName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Instructor Email',
    dataIndex: 'instructorEmail',
    key: 'instructorEmail',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text) => {
      let color = text === 'Submitted' ? 'green' : 'red';
      return (
        <Tag color={color} key={text}>
          {text}
        </Tag>
      );
    },
  },
];

const data = [
  {
    key: '1',
    labName: 'Lab 1',
    description: 'OOP LAB',
    date: '2023-09-10',
    instructorEmail: 'instructor1@example.com',
    status: 'Submitted', // Change the status value to 'Submitted' or 'Not Submitted'
  },
  {
    key: '2',
    labName: 'Lab 2',
    description: 'Data structures',
    date: '2023-09-11',
    instructorEmail: 'instructor2@example.com',
    status: 'Not Submitted', // Change the status value to 'Submitted' or 'Not Submitted'
  },
  {
    key: '3',
    labName: 'Lab 3',
    description: 'R studio',
    date: '2023-09-12',
    instructorEmail: 'instructor3@example.com',
    status: 'Submitted', // Change the status value to 'Submitted' or 'Not Submitted'
  },
];

const StudentAttemptTable = () => <Table columns={columns} dataSource={data} />;

export default StudentAttemptTable;