import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Splash from "./pages/splash";
import FileHandle from "./pages/Filehandle/Filehandle";
import Home from "./pages/Home/home";
import AdminDashboard from "./pages/Admin/dashboard";
import Instructor from "./pages/Admin/instructor";
import Labroom from "./pages/Admin/labroom";
import Students from "./pages/Admin/students";
import SignIn from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import LabroomStd from "./pages/student/LabroomStd";
import ViewLab from "./pages/instructor/ViewLab";
import Error from "./pages/404page/Error404"
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";
import Dashboard from "./pages/student/Dashboard";
import IDashboard from "./pages/instructor/Dashboard";
import ViewAssingment from "./pages/Admin/ViewAssingment";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<Error />} /> */}
        <Route index element={<Splash />} />
        <Route path="*" element={<Error />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/instructor/managemnet" element={<Instructor />} />
        <Route path="/admin/labroom/management" element={<Labroom />} />
        <Route path="/admin/students/management" element={<Students />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/studnetlabroom/:id" element={<LabroomStd />} />
        <Route path="/lab/meetingroom" element={<MeetingRoom />} />
        <Route path="/instructor/dashboard/:email" element={<IDashboard />} />
        <Route path="/instructor/assigments" element={<ViewAssingment />} />
        <Route path="/labview/:id" element={<ViewLab />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
