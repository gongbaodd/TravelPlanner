import React, { useState } from 'react';
import { Card, Table, Button, Typography, Space, Row, Col, Statistic, Input, Tag } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, ArrowLeftOutlined, UserOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IQuotationListItem, IClientInfo } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;

interface QuotationListPageProps {
  client: IClientInfo;
  onAddNew: () => void;
  onViewQuotation: (quotationId: string) => void;
  onEditQuotation?: (quotationId: string) => void;
  onBack: () => void;
}

const QuotationListPage: React.FC<QuotationListPageProps> = ({ 
  client, 
  onAddNew, 
  onViewQuotation,
  onEditQuotation,
  onBack 
}) => {
  const [searchText, setSearchText] = useState('');

  // Mock data - in real app, this would come from API
  const mockQuotations: (IQuotationListItem & { state: 'published' | 'draft' })[] = [
    {
      id: '1',
      clientName: client.companyName,
      groupName: 'European Tour Group A',
      totalCost: 15750.00,
      createdDate: new Date('2024-01-15'),
      status: 'approved',
      state: 'published'
    },
    {
      id: '2',
      clientName: client.companyName,
      groupName: 'Business Conference Trip',
      totalCost: 8920.50,
      createdDate: new Date('2024-01-10'),
      status: 'sent',
      state: 'published'
    },
    {
      id: '3',
      clientName: client.companyName,
      groupName: 'Cultural Heritage Tour',
      totalCost: 12300.75,
      createdDate: new Date('2024-01-05'),
      status: 'draft',
      state: 'draft'
    },
    {
      id: '4',
      clientName: client.companyName,
      groupName: 'Adventure Sports Package',
      totalCost: 22100.00,
      createdDate: new Date('2023-12-28'),
      status: 'rejected',
      state: 'published'
    }
  ];

  const filteredQuotations = mockQuotations.filter(quotation => {
    const matchesSearch = quotation.groupName.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const publishedCount = mockQuotations.filter(q => q.state === 'published').length;

  const handleActionClick = (record: any) => {
    if (record.state === 'draft') {
      // For draft quotations, go to edit mode (quotation form)
      if (onEditQuotation) {
        onEditQuotation(record.id);
      } else {
        // Fallback to add new if onEditQuotation is not provided
        onAddNew();
      }
    } else {
      // For published quotations, view results
      onViewQuotation(record.id);
    }
  };

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
      sorter: (a: any, b: any) => a.totalCost - b.totalCost,
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (state: 'published' | 'draft') => (
        <Tag 
          color={state === 'published' ? 'green' : 'orange'}
          icon={state === 'published' ? <CheckCircleOutlined /> : undefined}
        >
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </Tag>
      ),
      filters: [
        { text: 'Published', value: 'published' },
        { text: 'Draft', value: 'draft' },
      ],
      onFilter: (value: any, record: any) => record.state === value,
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
          ghost={record.state === 'published'}
          icon={record.state === 'draft' ? <EditOutlined /> : <EyeOutlined />}
          onClick={() => handleActionClick(record)}
          style={record.state === 'draft' ? { 
            backgroundColor: '#fa8c16', 
            borderColor: '#fa8c16', 
            color: 'white' 
          } : {}}
        >
          {record.state === 'draft' ? 'Edit' : 'View Results'}
        </Button>
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
                  Search Result
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                  Quotation Management for {client.companyName}
                </Text>
              </div>
              <Space>
                <Button
                  type="primary"
                  ghost
                  icon={<ArrowLeftOutlined />}
                  onClick={onBack}
                  size="large"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  Back to My Clients
                </Button>
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
              </Space>
            </div>
          </div>

          {/* Client Info Summary */}
          <Card
            title="Client Information"
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Company</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{client.companyName}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Contact Person</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{client.contactName}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Email</Text>
                  <div style={{ fontSize: '14px' }}>{client.email}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Phone</Text>
                  <div style={{ fontSize: '14px' }}>{client.tel}</div>
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
                  title="Published Count"
                  value={publishedCount}
                  valueStyle={{ color: '#52c41a', fontSize: '32px' }}
                  prefix={<CheckCircleOutlined />}
                  suffix={`/ ${mockQuotations.length}`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Draft Count"
                  value={mockQuotations.length - publishedCount}
                  valueStyle={{ color: '#fa8c16', fontSize: '32px' }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Quotations Table */}
          <Card
            title="Quotations"
            extra={
              <Search
                placeholder="Search quotations..."
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
              scroll={{ x: 800 }}
            />
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default QuotationListPage;