import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, Modal, Form, Input, message } from "antd";
const { Column } = Table;

const TableComponent = () => {
  const [courses, setCourses] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch courses data here
    axios
      .get("http://localhost:5000/api/admin/getalllabrooms")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const showDeleteModal = (record) => {
    setRecordToDelete(record);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const showUpdateForm = (record) => {
    setUpdatedData(record);
    setUpdateFormVisible(true);
  };

  const hideUpdateForm = () => {
    setUpdateFormVisible(false);
  };

  const handleDelete = () => {
    if (recordToDelete) {
      axios
        .delete(
          `http://localhost:5000/api/labroom/delete/${recordToDelete._id}`
        )
        .then((response) => {
          console.log(response);
          message.success("Course deleted successfully");
          // Remove the deleted item from the table
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course._id !== recordToDelete._id)
          );
          hideDeleteModal();
        })
        .catch((error) => {
          console.error(error);
          hideDeleteModal();
          message.error("Failed to delete course");
        });
    }
  };

  const handleUpdate = () => {
    if (updatedData) {
      axios
        .put(
          `http://localhost:5000/api/labroom/update/${updatedData._id}`,
          updatedData
        )
        .then((response) => {
          console.log(response);
          message.success("Course updated successfully");
          // Update the table with the new data
          setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course._id === updatedData._id ? updatedData : course
            )
          );
          hideUpdateForm();
        })
        .catch((error) => {
          console.error(error);
          hideUpdateForm();
          message.error("Failed to update course");
        });
    }
  };

  return (
    <div className="w-full pt-10">
      <Table dataSource={courses}>
        <Column title="Course Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Capacity" dataIndex="capacity" key="capacity" />
        <Column title="Instructor Name" dataIndex="instructorname" key="instructorname" />
        <Column title="Instructor Email" dataIndex="instructoremail" key="instructoremail" />
        <Column title="Lab Date" dataIndex="labdate" key="labdate" />

        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                style={{ backgroundColor: "#dcfce7" }}
                onClick={() => showUpdateForm(record)}
              >
                Update
              </Button>
              <Button
                style={{ backgroundColor: "#fee2e2" }}
                onClick={() => showDeleteModal(record)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
      >
        <p>Are you sure you want to delete this record?</p>
      </Modal>
      <Modal
        title="Update Record"
        visible={updateFormVisible}
        onOk={handleUpdate}
        onCancel={hideUpdateForm}
      >
        <Form
          form={form}
          initialValues={updatedData}
          onFinish={(values) => setUpdatedData(values)}
        >
          <Form.Item name="name" label="Course Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="capacity" label="Capacity">
            <Input />
          </Form.Item>
          <Form.Item name="instructorname" label="Instructor Name">
            <Input />
          </Form.Item>
          <Form.Item name="instructoremail" label="Instructor Email">
            <Input />
          </Form.Item>
          <Form.Item name="labdate" label="Lab Date">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableComponent;
