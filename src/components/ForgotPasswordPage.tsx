import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Result } from 'antd';
import { MailOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBackToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSentEmail(values.email);
      setEmailSent(true);
      message.success('Password reset email sent successfully!');
    } catch (error) {
      message.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div 
        style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          <Result
            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            title="Email Sent Successfully!"
            subTitle={
              <div style={{ textAlign: 'center' }}>
                <Text>
                  We've sent a password reset link to:
                </Text>
                <br />
                <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
                  {sentEmail}
                </Text>
                <br />
                <br />
                <Text type="secondary">
                  Please check your email inbox and follow the instructions to reset your password.
                  If you don't see the email, please check your spam folder.
                </Text>
              </div>
            }
            extra={[
              <Button
                key="back"
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={onBackToLogin}
                size="large"
                style={{
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                  border: 'none',
                  fontWeight: 'bold'
                }}
              >
                Back to Login
              </Button>
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '450px',
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
              background: 'linear-gradient(135deg, #fa8c16 0%, #d46b08 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '32px',
              color: 'white'
            }}
          >
            <MailOutlined />
          </div>
          <Title level={2} style={{ margin: 0, color: '#fa8c16' }}>
            Forgot Password
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </div>

        <Form
          name="forgotPassword"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter your email address!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your registered email address"
              style={{ borderRadius: '8px' }}
              autoFocus
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<MailOutlined />}
              style={{
                height: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #fa8c16 0%, #d46b08 100%)',
                border: 'none',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Sending Email...' : 'Send Reset Email'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link 
            onClick={onBackToLogin}
            style={{ 
              color: '#1890ff',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeftOutlined />
            Back to Login
          </Link>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '24px',
          padding: '16px',
          background: '#f6f6f6',
          borderRadius: '8px'
        }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <strong>Note:</strong> This is a demo system. In production, this would send a real email 
            with a secure password reset link.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;