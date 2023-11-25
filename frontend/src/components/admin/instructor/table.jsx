import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, Modal, Form, Input } from "antd";
const { Column } = Table;

const TableComponent = () => {
  const [instructors, setInstructors] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/getallinstructors")
      .then((response) => {
        const transformedData = response.data.map((instructor) => ({
          key: instructor._id,
          firstname: instructor.firstname,
          lastname: instructor.lastname,
          email: instructor.email,
          contact: instructor.contact,
        }));
        setInstructors(transformedData);
      })
      .catch((error) => {
        console.log(error);
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
    form.setFieldsValue(record); // Update the form's initial values with the selected record
  };
  
  const hideUpdateForm = () => {
    setUpdateFormVisible(false);
    form.resetFields(); // Reset the form's fields when hiding the form
  };

  const handleDelete = () => {
    if (recordToDelete) {
      axios
        .delete(
          `http://localhost:5000/api/admin/deleteinstructor/${recordToDelete.key}`
        )
        .then((response) => {
          console.log(response);
          // Remove the deleted item from the table
          setInstructors((prevInstructors) =>
            prevInstructors.filter(
              (instructor) => instructor.key !== recordToDelete.key
            )
          );
          hideDeleteModal();
        })
        .catch((error) => {
          console.log(error);
          hideDeleteModal();
        });
    }
  };

  const handleUpdate = () => {
    if (updatedData) {
      axios
        .put(
          `http://localhost:5000/api/instructor/update/${updatedData.key}`, // Use the provided URL with the data ID
          updatedData
        )
        .then((response) => {
          console.log(response);
          // Update the table with the new data
          setInstructors((prevInstructors) =>
            prevInstructors.map((instructor) =>
              instructor.key === updatedData.key ? updatedData : instructor
            )
          );
          hideUpdateForm();
        })
        .catch((error) => {
          console.log(error);
          hideUpdateForm();
        });
    }
  };

  const updatename = (e) => {
    setUpdatedData({ ...updatedData, firstname: e.target.value });
    console.log(updatedData);
  };

  return (
    <div className="w-full pt-10">
      <Table dataSource={instructors}>
        <Column title="First Name" dataIndex="firstname" key="fname" />
        <Column title="Last Name" dataIndex="lastname" key="lname" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Contact" dataIndex="contact" key="contact" />
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
          onChange={updatename}
        >
          <Form.Item name="firstname"  label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="contact" label="Contact">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableComponent;
