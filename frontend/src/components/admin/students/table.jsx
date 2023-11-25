import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, Modal, Form, Input, message } from "antd";
const { Column } = Table;

const TableComponent = () => {
  const [students, setStudents] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch student data here
    axios
      .get("http://localhost:5000/api/admin/getallstudents")
      .then((response) => {
        setStudents(response.data);
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
          `http://localhost:5000/api/admin/deleteinstructor/${recordToDelete._id}`
        )
        .then((response) => {
          console.log(response);
          message.success("Student deleted successfully");
          // Remove the deleted item from the table
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student._id !== recordToDelete._id)
          );
          hideDeleteModal();
        })
        .catch((error) => {
          console.error(error);
          hideDeleteModal();
          message.error("Failed to delete student");
        });
    }
  };

  const handleUpdate = () => {
    if (updatedData) {
      axios
        .put(
          `http://localhost:5000/api/admin/updatestudent/${updatedData._id}`,
          updatedData
        )
        .then((response) => {
          console.log(response);
          message.success("Student updated successfully");
          // Update the table with the new data
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student._id === updatedData._id ? updatedData : student
            )
          );
          hideUpdateForm();
        })
        .catch((error) => {
          console.error(error);
          hideUpdateForm();
          message.error("Failed to update student");
        });
    }
  };

  return (
    <div className="w-full pt-10">
      <Table dataSource={students}>
        <Column title="First Name" dataIndex="firstname" key="firstname" />
        <Column title="Last Name" dataIndex="lastname" key="lastname" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Created At" dataIndex="createdAt" key="createdAt" />

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
          <Form.Item name="firstname" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableComponent;
