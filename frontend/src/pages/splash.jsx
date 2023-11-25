import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // After 3 seconds, navigate to the home page
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1600);

    // Clean up the timer if the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center bg-blue-100">
        <h1 h1 class="animate-ping  bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent md:text-6xl text-4xl lg:text-9xl font-medium font-black">CodeWave</h1>
      </div>
    </div>
  );
};

export default Splash;
