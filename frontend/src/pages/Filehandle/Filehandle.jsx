import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase-config";
import { ref, uploadBytesResumable } from "firebase/storage";
import { message, Button, Input, Tooltip } from "antd";
const { TextArea } = Input;

function Filehandle({ labName }) {
  const [file, setFile] = useState("");
  const [student, setStudent] = useState("");
  const [lab, setLab] = useState();
  const [comment, setComment] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const [value, setValue] = useState(labName);

  // Function to upload file to Firebase
  const uploadFile = (e) => {
    if (!file) {
      messageApi.error({
        content: `Please insert a file`,
        key,
        duration: 2,
      });
      return;
    } else if (!student || !value || !comment) {
      messageApi.error({
        content: `Please fill all the fields`,
        key,
        duration: 2,
      });
      return;
    } else {
      // Get the current date in yyyy-mm-dd format
      const currentDate = new Date().toISOString().split("T")[0];

      const filename = `${student}_${value}_${currentDate}`;
      const filepath = `files/${value}/${filename}`;

      console.log(filepath);

      const storageRef = ref(storage, filepath);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      });

      uploadTask.then(() => {
        message.success({
          content: `File uploaded successfully`,
          duration: 2,
        });
      });
    }
  }

  return (
    <div className="border rounded bg-slate-100 w-full flex flex-col justify-center items-center py-4">
      {contextHolder}
      <div className="flex flex-col px-5 py-6 bg-white border border-separate gap-4 rounded">
        <Input
          placeholder="Student Name"
          onChange={(e) => setStudent(e.target.value)}
          required
        />
        <Input
          placeholder="Lab Number"
          onChange={(e) => setValue(e.target.value)}
          value={labName}
        />
        <TextArea
          rows={4}
          placeholder="Comments"
          maxLength={6}
          onChange={(e) => setComment(e.target.value)}
        />
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button
          type="primary"
          onClick={uploadFile}
          style={{ backgroundColor: "#1677FF" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Filehandle;
