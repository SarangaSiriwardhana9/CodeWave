import React from "react";
import user_pic from "../../assets/user_pic.jpg";
import {
  DesktopOutlined,
  AliyunOutlined,
  HomeOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { Button, Menu, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

const SidePanel = () => {
  const labKey = sessionStorage.getItem("labKey");
  const firstName = sessionStorage.getItem("userFname");
  const navigate = useNavigate();
  const email = sessionStorage.getItem("userEmail");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const iemail = email;

  const openMeetingRoom = () => {
    // Open the meeting room URL in a new tab
    window.open("/lab/meetingroom", "_blank");
  };

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      link: "/instructor/dashboard/" + iemail,
    },
    {
      key: "2",
      icon: <PartitionOutlined />,
      label: "Assignments",
      link: "/instructor/assigments",
    },
    {
      key: "3",
      icon: <AliyunOutlined />,
      label: "Start a Meeting",
      onClick: openMeetingRoom, // Call the openMeetingRoom function to open in a new tab
    },
    {
      key: "4",
      icon: <DesktopOutlined />,
      label: "Log Out",
      onClick: handleLogout, // Call the handleLogout function
    },
  ];

  return (
    <div className="h-screen py-2 pl-2 w-[400px]">
      <div className="w-full h-full bg-[#001529] rounded-md py-2 flex flex-col justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full text-white text-xl px-2 ">Hi {firstName}!</div>
          <img
            src={user_pic}
            alt="logo"
            className="w-40 h-40 mx-auto my-4 rounded-full"
          />
          <div className="w-full pt-10  flex justify-center">
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              style={{
                width: " 100%",
                height: "100%",
                paddingTop: 6,
                paddingLeft: 10,
                paddingRight: 10,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxHeight: 600,
                overflow: "hidden",
              }}
            >
              {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.onClick ? (
                    <a onClick={item.onClick}>{item.label}</a>
                  ) : (
                    <Link to={item.link}>{item.label}</Link>
                  )}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </div>
        <div className="w-full h-5 text-white text-center">
          Made with 💜 by CodeWave
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
