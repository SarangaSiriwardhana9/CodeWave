import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const cardOne = () => (
  <div>
    <h1 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' ,fontSize: '24px'}}> Submission Status</h1>
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={true}>
          <Statistic
            title="Attempted"
            value={11.28}
            precision={2}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={true}>
          <Statistic
            title="Not Attempted"
            value={9.3}
            precision={2}
            valueStyle={{
              color: '#cf1322',
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
);

export default cardOne;
