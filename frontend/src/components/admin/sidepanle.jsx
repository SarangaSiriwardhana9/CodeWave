import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UsergroupDeleteOutlined,
  DesktopOutlined,
  SolutionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
    link: "/admin/dashboard", // Specify the route path for this option
  },
  {
    key: "2",
    icon: <SolutionOutlined />,
    label: "Instructors",
    link: "/admin/instructor/managemnet", // Specify the route path for this option
  },
  {
    key: "3",
    icon: <DesktopOutlined />,
    label: "Labrooms",
    link: "/admin/labroom/management", // Specify the route path for this option
  },
  {
    key: "4",
    icon: <UsergroupDeleteOutlined />,
    label: "Students",
    link: "/admin/students/management", // Specify the route path for this option
  },
];
const Sidepanle = () => {
  return (
    <div>
      <div className="flex flex-col w-fit h-full ">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          style={{
            width: 200,
            height: "100%",
            paddingTop: 6,
            paddingBottom: 100,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxHeight: 600,
            overflow: "hidden",
          }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default Sidepanle;
