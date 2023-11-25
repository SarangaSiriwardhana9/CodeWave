import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const columns = [
  {
    title: 'Lab Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text) => (
      <span title={text.length > 50 ? text : null}>
        {text.length > 50 ? text.slice(0, 50) + '...' : text}
        {text.length > 50 && (
          <a style={{ marginLeft: '5px' }}>Read More</a>
        )}
      </span>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'labdate',
    key: 'labdate',
  },
  {
    title: 'Instructor Email',
    dataIndex: 'instructoremail',
    key: 'instructoremail',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text) => {
      let color = text === 'completed' ? 'green' : 'red';
      return (
        <Tag color={color} key={text}>
          {text}
        </Tag>
      );
    },
  },
];

const LabTable = () => {
  const [data, setData] = useState([]);
  const studentId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (studentId) {
      // Fetch lab data using the studentId
      axios
        .get(`http://localhost:5000/api/student/enroll/lab/student/${studentId}`)
        .then((response) => {
          // Format the date using dayjs
          const formattedData = response.data.map((item) => ({
            ...item,
            labdate: dayjs(item.labdate).format('YYYY-MM-DD'), // Format the date
          }));
          setData(formattedData);
        })
        .catch((error) => {
          console.error('Error fetching lab data:', error);
        });
    }
  }, [studentId]);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default LabTable;
