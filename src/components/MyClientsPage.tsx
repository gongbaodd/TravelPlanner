import React, { useState } from 'react';
import { Card, Table, Button, Typography, Space, Row, Col, Statistic, Input, Avatar, Tag } from 'antd';
import { 
  PlusOutlined, 
  EyeOutlined, 
  SearchOutlined, 
  UserOutlined, 
  TeamOutlined,
  CalendarOutlined,
  BankOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { IGreatLineInfo, IClientInfo, IQuotationListItem } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;

interface MyClientsPageProps {
  greatLineInfo: IGreatLineInfo;
  onCreateClient: () => void;
  onViewClient: (client: IClientInfo) => void;
}

// Mock data for clients and their quotations with state
const mockClientsData = [
  {
    client: {
      id: '1',
      companyName: 'Adventure Tours Ltd',
      contactName: 'John Smith',
      email: 'john@adventuretours.com',
      tel: '+1-555-0101',
      address: '123 Travel Street, New York, NY 10001'
    },
    quotations: [
      {
        id: '1',
        clientName: 'Adventure Tours Ltd',
        groupName: 'European Heritage Tour',
        totalCost: 15750.00,
        createdDate: new Date('2024-01-15'),
        status: 'approved' as const,
        state: 'published' as const
      },
      {
        id: '2',
        clientName: 'Adventure Tours Ltd',
        groupName: 'Business Conference Trip',
        totalCost: 8920.50,
        createdDate: new Date('2024-01-10'),
        status: 'sent' as const,
        state: 'published' as const
      }
    ]
  },
  {
    client: {
      id: '2',
      companyName: 'Global Business Travel',
      contactName: 'Maria Garcia',
      email: 'maria@globalbiz.com',
      tel: '+1-555-0202',
      address: '456 Corporate Ave, Los Angeles, CA 90210'
    },
    quotations: [
      {
        id: '3',
        clientName: 'Global Business Travel',
        groupName: 'Executive Retreat',
        totalCost: 12300.75,
        createdDate: new Date('2024-01-05'),
        status: 'draft' as const,
        state: 'draft' as const
      }
    ]
  },
  {
    client: {
      id: '3',
      companyName: 'Family Vacation Co',
      contactName: 'Robert Brown',
      email: 'robert@familyvacation.com',
      tel: '+1-555-0303',
      address: '789 Holiday Blvd, Miami, FL 33101'
    },
    quotations: [
      {
        id: '4',
        clientName: 'Family Vacation Co',
        groupName: 'Family Adventure Package',
        totalCost: 22100.00,
        createdDate: new Date('2023-12-28'),
        status: 'rejected' as const,
        state: 'published' as const
      },
      {
        id: '5',
        clientName: 'Family Vacation Co',
        groupName: 'Summer Beach Holiday',
        totalCost: 18500.00,
        createdDate: new Date('2024-01-20'),
        status: 'approved' as const,
        state: 'draft' as const
      }
    ]
  }
];

const MyClientsPage: React.FC<MyClientsPageProps> = ({ 
  greatLineInfo, 
  onCreateClient, 
  onViewClient 
}) => {
  const [searchText, setSearchText] = useState('');

  const allQuotations = mockClientsData.flatMap(clientData => 
    clientData.quotations.map(quotation => ({
      ...quotation,
      client: clientData.client
    }))
  );

  // Filter clients based on search text
  const filteredClients = mockClientsData.filter(clientData =>
    clientData.client.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
    clientData.client.contactName.toLowerCase().includes(searchText.toLowerCase()) ||
    clientData.client.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalClients = mockClientsData.length;
  const totalQuotations = allQuotations.length;
  const publishedCount = allQuotations.filter(q => q.state === 'published').length;

  const handleViewClient = (client: IClientInfo) => {
    onViewClient(client);
  };

  // Columns for clients table (simplified)
  const columns = [
    {
      title: 'Company Name',
      dataIndex: ['client', 'companyName'],
      key: 'companyName',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Contact Person',
      dataIndex: ['client', 'contactName'],
      key: 'contactName',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Email',
      dataIndex: ['client', 'email'],
      key: 'email',
      render: (email: string) => <Text>{email}</Text>,
    },
    {
      title: 'Phone',
      dataIndex: ['client', 'tel'],
      key: 'tel',
      render: (tel: string) => <Text>{tel}</Text>,
    },
    {
      title: 'Total Quotations',
      key: 'quotationCount',
      render: (_, record: any) => (
        <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#1890ff' }}>
          {record.quotations.length}
        </Text>
      ),
      sorter: (a: any, b: any) => a.quotations.length - b.quotations.length,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleViewClient(record.client)}
        >
          View Results
        </Button>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
              margin: '-24px -24px 24px -24px',
              padding: '32px 24px',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
                  <TeamOutlined style={{ marginRight: '16px' }} />
                  My Clients
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                  Manage your clients and quotations
                </Text>
              </div>
              <Button
                type="primary"
                ghost
                icon={<PlusOutlined />}
                onClick={onCreateClient}
                size="large"
                style={{ borderColor: 'white', color: 'white' }}
              >
                Create/Search Client
              </Button>
            </div>
          </div>

          {/* Great Line Info */}
          <Card
            title={
              <Space>
                <BankOutlined style={{ color: '#1890ff' }} />
                <span>Great Line Information</span>
              </Space>
            }
            style={{ marginBottom: '24px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Contact Name</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{greatLineInfo.contactName}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Department</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{greatLineInfo.department}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Email</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{greatLineInfo.email}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Phone</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{greatLineInfo.tel}</div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Statistics */}
          <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Clients"
                  value={totalClients}
                  valueStyle={{ color: '#722ed1', fontSize: '32px' }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Quotations"
                  value={totalQuotations}
                  valueStyle={{ color: '#1890ff', fontSize: '32px' }}
                  prefix={<CalendarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Published Count"
                  value={publishedCount}
                  valueStyle={{ color: '#52c41a', fontSize: '32px' }}
                  prefix={<CheckCircleOutlined />}
                  suffix={`/ ${totalQuotations}`}
                />
              </Card>
            </Col>
          </Row>

          {/* Clients List */}
          <Card
            title="All Clients"
            extra={
              <Search
                placeholder="Search clients by company, contact, or email..."
                allowClear
                style={{ width: 350 }}
                onChange={(e) => setSearchText(e.target.value)}
              />
            }
            style={{ marginBottom: '24px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={columns}
              dataSource={filteredClients.map(clientData => ({ ...clientData, key: clientData.client.id }))}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} clients`
              }}
              scroll={{ x: 1000 }}
            />
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default MyClientsPage;