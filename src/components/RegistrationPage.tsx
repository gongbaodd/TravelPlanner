import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, BankOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

interface RegistrationPageProps {
  onRegister: (greatLineInfo: {
    contactName: string;
    department: string;
    tel: string;
    email: string;
    password: string;
  }) => void;
  onSwitchToLogin: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegister, onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);

  const departmentOptions = [
    'Travel Operations',
    'Sales Department',
    'Customer Service',
    'Business Development',
    'Marketing',
    'Finance',
    'Management'
  ];

  const handleSubmit = async (values: {
    contactName: string;
    department: string;
    tel: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const { confirmPassword, ...greatLineData } = values;
      onRegister(greatLineData);
      message.success('Great Line account created successfully! Welcome to the system.');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '32px',
              color: 'white'
            }}
          >
            <BankOutlined />
          </div>
          <Title level={2} style={{ margin: 0, color: '#52c41a' }}>
            Great Line Registration
          </Title>
          <Text type="secondary">Create your Great Line operator account</Text>
        </div>

        <Form
          name="greatLineRegistration"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="contactName"
                label="Contact Name"
                rules={[
                  { required: true, message: 'Please enter your contact name!' },
                  { min: 2, message: 'Name must be at least 2 characters!' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your full name"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[
                  { required: true, message: 'Please select your department!' }
                ]}
              >
                <Input
                  prefix={<BankOutlined />}
                  placeholder="Enter your department"
                  style={{ borderRadius: '8px' }}
                  list="departments"
                />
                <datalist id="departments">
                  {departmentOptions.map(dept => (
                    <option key={dept} value={dept} />
                  ))}
                </datalist>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your email address"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="tel"
                label="Phone Number"
                rules={[
                  { required: true, message: 'Please enter your phone number!' },
                  { pattern: /^[\+]?[1-9][\d]{0,15}$/, message: 'Please enter a valid phone number!' }
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Enter your phone number"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please enter your password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm your password"
                  style={{ borderRadius: '8px' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: '16px', marginTop: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<UserAddOutlined />}
              style={{
                height: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                border: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Create Great Line Account
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Text type="secondary">
            Already have an account?{' '}
            <Link 
              onClick={onSwitchToLogin}
              style={{ 
                color: '#52c41a',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Sign In
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default RegistrationPage;