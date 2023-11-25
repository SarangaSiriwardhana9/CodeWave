import React from 'react';
import { Progress } from 'antd';
const App = () => (
  <div>
    <h1 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' ,fontSize: '24px'}}> Status Summary</h1>
  <div
    style={{
      width: 500,
    }}
  >
    <Progress percent={30} size="small" />
    <Progress percent={50} size="small" status="active" />
    <Progress percent={70} size="small" status="exception" />
    <Progress percent={100} size="small" />
  </div>
  </div>
);
export default App;