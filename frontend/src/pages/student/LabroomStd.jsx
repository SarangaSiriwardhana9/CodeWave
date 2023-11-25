import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Steps, Spin, Button, message,Modal } from "antd";
import axios from "axios";
import Layout from "./layout";
import DataForm from "../../components/student/Dataform";
import Filehandle from "../Filehandle/Filehandle";

function LabroomStd() {
  const [labName, setLabName] = useState();
  const { id } = useParams();
  const [stepCompleted, setStepCompleted] = useState(false);
  const [LabId, setLabId] = useState("");
  const studentId = sessionStorage.getItem("userId");
  const [meetinglink, setMeetinglink] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const uploadhandler = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const submithandler = () => {
    if (!LabId || !studentId) {
      message.error("Lab ID or Student ID is missing.");
      return;
    }

    const requestBody = {
      labId: LabId,
    };
    axios
      .put(
        `http://localhost:5000/api/student/enroll/updatestatus/${studentId}`,
        requestBody
      )
      .then((response) => {
        if (response.status === 200) {
          message.success("Lab successfully submitted.");

          setTimeout(() => {
            window.location.href = "/student/dashboard";
          }, 2000);
        } else {
          message.error("Failed to submit lab. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error submitting lab:", error);
        message.error(
          "An error occurred while submitting the lab. Please try again later."
        );
      });
  };

  const handleLabNameFetched = (name) => {
    // setLabName(name);
    console.log(name);
    setLabName(name);
  };

  const handleStepCompletion = () => {
    setStepCompleted(true);
  };

  const handleLabIdFetched = (id) => {
    setLabId(id);
  };
  const meetinghandler = (link) => {
    setMeetinglink(link);
  };
  const meetingjoinhandler = () => {
    if (meetinglink) {
      window.open(meetinglink, "_blank");
    } else {
      message.error("Meeting link is not available.");
    }
  };

  return (
    <Layout>
      <div className="w-full flex-col border  max-h-screen overflow-y-auto">
        <DataForm
          id={id}
          onLabNameFetched={handleLabNameFetched}
          onStepCompletion={handleStepCompletion}
          onLabIdFetched={handleLabIdFetched}
          onMeetingRoom={meetinghandler}
        />
        <div className="flex-grow w-full p-4 px-8">
          <div className="w-full h-full px-5 rounded-lg py-2 border flex items-center gap-5">
            <div className="text-xl whitespace-nowrap">
              Upload Your Answer :
            </div>
            <div className="grow shrink border rounded bg-slate-50 py-2 px-5">
              <Button
                type="primary"
                onClick={uploadhandler}
                style={{ backgroundColor: "#296F9D" }}
              >
                Upload
              </Button>

              <Modal
                title="Upload Your Pdf File"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Filehandle labName={labName}/>
              </Modal>
            </div>
          </div>
        </div>

        <div className="flex-grow w-full p-4 px-8">
          <div className="w-full h-full px-5 rounded-lg py-2 border flex items-center gap-5">
            <div className="text-xl whitespace-nowrap">
              Meeting with Instructor :
            </div>
            <div className="grow shrink  rounded bg-slate-50 py-2 px-5">
              <Button
                type="primary"
                onClick={meetingjoinhandler}
                style={{ backgroundColor: "#296F9D" }}
              >
                Join Meeting
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-grow w-full p-4 px-4">
          {!stepCompleted ? (
            <div className="w-full h-full px-5 rounded-lg py-2 flex items-center justify-center">
              <p className="text-red-500 font-semibold text-xl">
                Please complete your lab.🚨
              </p>
            </div>
          ) : (
            <div className="w-full h-full px-5 rounded-lg py-2 flex items-center gap-5">
              <div className="grow shrink  rounded bg-slate-50 py-2 px-5 flex justify-center">
                <Button
                  type="primary"
                  onClick={submithandler}
                  style={{
                    backgroundColor: "#296F9D",
                    width: 200,
                    height: 50,
                    fontSize: "1.5em",
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* <Chat /> */}
      </div>
    </Layout>
  );
}

export default LabroomStd;
