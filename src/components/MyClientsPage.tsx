import React, { useState } from 'react';
import { Card, Table, Button, Typography, Space, Row, Col, Statistic, Input, Tag, Avatar } from 'antd';
import { 
  PlusOutlined, 
  EyeOutlined, 
  SearchOutlined, 
  UserOutlined, 
  TeamOutlined,
  CalendarOutlined,
  EuroOutlined,
  BankOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { IGreatLineInfo, IClientInfo, IGroupInfo, IQuotationListItem } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;

interface MyClientsPageProps {
  greatLineInfo: IGreatLineInfo;
  onCreateClient: () => void;
  onViewClient: (client: IClientInfo, groupInfo: IGroupInfo) => void;
}

// Mock data for clients and their quotations
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
    groupInfo: {
      number: 'GRP001',
      name: 'European Heritage Tour',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-25'),
      type: 'single' as const
    },
    quotations: [
      {
        id: '1',
        clientName: 'Adventure Tours Ltd',
        groupName: 'European Heritage Tour',
        totalCost: 15750.00,
        createdDate: new Date('2024-01-15'),
        status: 'approved' as const,
        greatLineContact: 'Sarah Johnson'
      },
      {
        id: '2',
        clientName: 'Adventure Tours Ltd',
        groupName: 'Business Conference Trip',
        totalCost: 8920.50,
        createdDate: new Date('2024-01-10'),
        status: 'sent' as const,
        greatLineContact: 'Mike Chen'
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
    groupInfo: {
      number: 'GRP002',
      name: 'Executive Retreat',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-05'),
      type: 'business' as const
    },
    quotations: [
      {
        id: '3',
        clientName: 'Global Business Travel',
        groupName: 'Executive Retreat',
        totalCost: 12300.75,
        createdDate: new Date('2024-01-05'),
        status: 'draft' as const,
        greatLineContact: 'David Wilson'
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
    groupInfo: {
      number: 'GRP003',
      name: 'Family Adventure Package',
      startDate: new Date('2024-05-10'),
      endDate: new Date('2024-05-20'),
      type: 'single' as const
    },
    quotations: [
      {
        id: '4',
        clientName: 'Family Vacation Co',
        groupName: 'Family Adventure Package',
        totalCost: 22100.00,
        createdDate: new Date('2023-12-28'),
        status: 'rejected' as const,
        greatLineContact: 'Lisa Anderson'
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
      client: clientData.client,
      groupInfo: clientData.groupInfo
    }))
  );

  const filteredQuotations = allQuotations.filter(quotation =>
    quotation.groupName.toLowerCase().includes(searchText.toLowerCase()) ||
    quotation.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
    quotation.greatLineContact.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalClients = mockClientsData.length;
  const totalQuotations = allQuotations.length;
  const totalValue = allQuotations.reduce((sum, q) => sum + q.totalCost, 0);
  const approvedCount = allQuotations.filter(q => q.status === 'approved').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'green';
      case 'sent': return 'blue';
      case 'draft': return 'orange';
      case 'rejected': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Client Company',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (cost: number) => (
        <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#1890ff' }}>
          €{cost.toLocaleString()}
        </Text>
      ),
      sorter: (a: any, b: any) => a.totalCost - b.totalCost,
    },
    {
      title: 'Great Line Contact',
      dataIndex: 'greatLineContact',
      key: 'greatLineContact',
      render: (contact: string) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{contact}</Text>
        </Space>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: Date) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a: any, b: any) => 
        dayjs(a.createdDate).unix() - dayjs(b.createdDate).unix(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => onViewClient(record.client, record.groupInfo)}
        >
          View Details
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
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Total Clients"
                  value={totalClients}
                  valueStyle={{ color: '#722ed1', fontSize: '32px' }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Total Quotations"
                  value={totalQuotations}
                  valueStyle={{ color: '#1890ff', fontSize: '32px' }}
                  prefix={<CalendarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Approved"
                  value={approvedCount}
                  valueStyle={{ color: '#52c41a', fontSize: '32px' }}
                  suffix={`/ ${totalQuotations}`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Success Rate"
                  value={totalQuotations > 0 ? Math.round((approvedCount / totalQuotations) * 100) : 0}
                  valueStyle={{ color: '#fa8c16', fontSize: '32px' }}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          {/* Quotations List */}
          <Card
            title="All Quotations"
            extra={
              <Search
                placeholder="Search quotations, clients, or contacts..."
                allowClear
                style={{ width: 300 }}
                onChange={(e) => setSearchText(e.target.value)}
              />
            }
            style={{ marginBottom: '24px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={columns}
              dataSource={filteredQuotations.map(q => ({ ...q, key: q.id }))}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} quotations`
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