import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Leftbar from './LeftBar';
import EnrollmentForm from './EnrollmentForm';

const Home = () => {
  const [enrollmentKey, setEnrollmentKey] = useState('');

  // const handleEnrollmentKeyChange = (e) => {
  //   setEnrollmentKey(e.target.value);
  // };

  // const handleEnrollmentKeySubmit = () => {
  //   // Handle enrollment key submission here
  //   console.log('Enrollment Key submitted:', enrollmentKey);
  //   // You can add your logic to handle the enrollment key here
  // };

  return (
    <div className="w-full h-full flex-col gap-5">
      <div className="w-full h-[50px] ">
         <Header /> 
      </div>
      <div className="border w-[200px] h-[500px]  flex">
        <Leftbar />
      </div>
    </div>
  );
};

export default Home;
