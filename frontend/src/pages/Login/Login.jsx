import React from "react";
import { Link } from "react-router-dom";
import Form from "../../components/login/form";
import CodeAnimation from "../../animation/Code";

const Login = () => {
  return (
    <div className="flex  justify-center items-center min-h-screen bg-gray-100 ">
      <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg h-[800px] flex flex-col justify-between">
        <div className="flex flex-col grow">
          <h1 className="text-3xl font-semibold text-center mb-6">Log In</h1>
          <div className="flex flex-row justify-between">
            <div className="w-1/2 h-[700px] bg-blue-400 px-8 pl-8 rounded-lg flex flex-col justify-between">
              <div className="text-white text-4xl font-semibold mt-4">
                CodeWave
              </div>
              <div>
                <CodeAnimation className="w-full h-full" />
              </div>
              <div className="text-white text-sm  w-full flex justify-center mb-2">
                Powered by CodeWave
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-evenly">
              <Form />
              <div className="text-center mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
