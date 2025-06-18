import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Space, Row, Col, DatePicker, Select } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, SearchOutlined, PlusOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import { IClientInfo, IGroupInfo, TGroupType } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface CreateClientPageProps {
  onSubmit: (client: IClientInfo, groupInfo: IGroupInfo) => void;
}

const CreateClientPage: React.FC<CreateClientPageProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const clientData: IClientInfo = {
        id: Date.now().toString(),
        companyName: values.companyName,
        contactName: values.contactName,
        email: values.email,
        tel: values.tel,
        address: values.address
      };

      const groupData: IGroupInfo = {
        number: values.groupNumber,
        name: values.groupName,
        startDate: values.startDate.toDate(),
        endDate: values.endDate.toDate(),
        type: values.groupType
      };
      
      onSubmit(clientData, groupData);
      message.success('Client and group information saved successfully!');
    } catch (error) {
      message.error('Failed to save information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
              margin: '-24px -24px 24px -24px',
              padding: '32px 24px',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px'
              }}
            >
              <UserOutlined />
            </div>
            <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
              Create Client & Group
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
              Enter client information and create group details
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
            initialValues={{
              groupType: 'single',
              startDate: dayjs(),
              endDate: dayjs().add(7, 'day')
            }}
          >
            {/* Client Information Section */}
            <Card
              title={
                <Space>
                  <UserOutlined style={{ color: '#52c41a' }} />
                  <span>Client Information</span>
                </Space>
              }
              style={{ marginBottom: '24px' }}
              headStyle={{ borderBottom: '2px solid #f0f0f0' }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[{ required: true, message: 'Please enter company name!' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter company name"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Contact Name"
                    name="contactName"
                    rules={[{ required: true, message: 'Please enter contact name!' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter contact person name"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter email address"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone"
                    name="tel"
                    rules={[{ required: true, message: 'Please enter phone number!' }]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Enter phone number"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter address!' }]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Enter complete address"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Group Information Section */}
            <Card
              title={
                <Space>
                  <TeamOutlined style={{ color: '#1890ff' }} />
                  <span>Group Information</span>
                </Space>
              }
              style={{ marginBottom: '24px' }}
              headStyle={{ borderBottom: '2px solid #f0f0f0' }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Group Number"
                    name="groupNumber"
                    rules={[{ required: true, message: 'Please enter group number!' }]}
                  >
                    <Input
                      prefix={<TeamOutlined />}
                      placeholder="Enter group number (e.g., GRP001)"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Group Name"
                    name="groupName"
                    rules={[{ required: true, message: 'Please enter group name!' }]}
                  >
                    <Input
                      prefix={<TeamOutlined />}
                      placeholder="Enter group name"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Group Type"
                    name="groupType"
                    rules={[{ required: true, message: 'Please select group type!' }]}
                  >
                    <Select style={{ borderRadius: '8px' }}>
                      <Select.Option value="single">Single Tour</Select.Option>
                      <Select.Option value="series">Series Tours</Select.Option>
                      <Select.Option value="business">Business Travel</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Start Date"
                    name="startDate"
                    rules={[{ required: true, message: 'Please select start date!' }]}
                  >
                    <DatePicker 
                      style={{ width: '100%', borderRadius: '8px' }}
                      placeholder="Select start date"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={8}>
                  <Form.Item
                    label="End Date"
                    name="endDate"
                    rules={[{ required: true, message: 'Please select end date!' }]}
                  >
                    <DatePicker 
                      style={{ width: '100%', borderRadius: '8px' }}
                      placeholder="Select end date"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<SearchOutlined />}
                style={{
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)',
                  minWidth: '200px'
                }}
              >
                Search or Create
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateClientPage;