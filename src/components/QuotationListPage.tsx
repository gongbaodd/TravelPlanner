import React, { useState } from 'react';
import { Card, Table, Button, Typography, Space, Tag, Row, Col, Statistic, Input, Select } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, SearchOutlined, UserOutlined, EuroOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IQuotationListItem, IClientInfo } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;

interface QuotationListPageProps {
  client: IClientInfo;
  onAddNew: () => void;
  onViewQuotation: (quotationId: string) => void;
}

const QuotationListPage: React.FC<QuotationListPageProps> = ({ client, onAddNew, onViewQuotation }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - in real app, this would come from API
  const mockQuotations: IQuotationListItem[] = [
    {
      id: '1',
      clientName: client.companyName,
      groupName: 'European Tour Group A',
      totalCost: 15750.00,
      createdDate: new Date('2024-01-15'),
      status: 'approved'
    },
    {
      id: '2',
      clientName: client.companyName,
      groupName: 'Business Conference Trip',
      totalCost: 8920.50,
      createdDate: new Date('2024-01-10'),
      status: 'sent'
    },
    {
      id: '3',
      clientName: client.companyName,
      groupName: 'Cultural Heritage Tour',
      totalCost: 12300.75,
      createdDate: new Date('2024-01-05'),
      status: 'draft'
    },
    {
      id: '4',
      clientName: client.companyName,
      groupName: 'Adventure Sports Package',
      totalCost: 22100.00,
      createdDate: new Date('2023-12-28'),
      status: 'rejected'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'green';
      case 'sent': return 'blue';
      case 'draft': return 'orange';
      case 'rejected': return 'red';
      default: return 'default';
    }
  };

  const filteredQuotations = mockQuotations.filter(quotation => {
    const matchesSearch = quotation.groupName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = mockQuotations.reduce((sum, q) => sum + q.totalCost, 0);
  const approvedCount = mockQuotations.filter(q => q.status === 'approved').length;

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (text: string) => <Text strong>{text}</Text>,
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
      sorter: (a: IQuotationListItem, b: IQuotationListItem) => a.totalCost - b.totalCost,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: Date) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a: IQuotationListItem, b: IQuotationListItem) => 
        dayjs(a.createdDate).unix() - dayjs(b.createdDate).unix(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)} style={{ textTransform: 'capitalize' }}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Draft', value: 'draft' },
        { text: 'Sent', value: 'sent' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value: any, record: IQuotationListItem) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: IQuotationListItem) => (
        <Space>
          <Button
            type="primary"
            ghost
            icon={<EyeOutlined />}
            onClick={() => onViewQuotation(record.id)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => onViewQuotation(record.id)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
              margin: '-24px -24px 24px -24px',
              padding: '32px 24px',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
                  <UserOutlined style={{ marginRight: '16px' }} />
                  {client.companyName}
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                  Quotation Management Dashboard
                </Text>
              </div>
              <Button
                type="primary"
                ghost
                icon={<PlusOutlined />}
                onClick={onAddNew}
                size="large"
                style={{ borderColor: 'white', color: 'white' }}
              >
                Add New Quotation
              </Button>
            </div>
          </div>

          {/* Client Info Summary */}
          <Card
            title="Client Information"
            style={{ marginBottom: '24px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Contact Person</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{client.contactName}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Email</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{client.email}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Phone</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{client.tel}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Address</Text>
                  <div style={{ fontSize: '14px' }}>{client.address}</div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Statistics */}
          <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Quotations"
                  value={mockQuotations.length}
                  valueStyle={{ color: '#722ed1', fontSize: '32px' }}
                  prefix={<CalendarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Value"
                  value={totalValue}
                  precision={2}
                  valueStyle={{ color: '#1890ff', fontSize: '28px' }}
                  prefix={<EuroOutlined />}
                  suffix="EUR"
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Approved"
                  value={approvedCount}
                  valueStyle={{ color: '#52c41a', fontSize: '32px' }}
                  suffix={`/ ${mockQuotations.length}`}
                />
              </Card>
            </Col>
          </Row>

          {/* Filters and Search */}
          <Card
            title="Quotations"
            extra={
              <Space>
                <Search
                  placeholder="Search quotations..."
                  allowClear
                  style={{ width: 250 }}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ width: 120 }}
                >
                  <Select.Option value="all">All Status</Select.Option>
                  <Select.Option value="draft">Draft</Select.Option>
                  <Select.Option value="sent">Sent</Select.Option>
                  <Select.Option value="approved">Approved</Select.Option>
                  <Select.Option value="rejected">Rejected</Select.Option>
                </Select>
              </Space>
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
              scroll={{ x: 800 }}
            />
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default QuotationListPage;