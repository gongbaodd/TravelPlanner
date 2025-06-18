import React from 'react';
import {
  Card,
  Table,
  Typography,
  Row,
  Col,
  Statistic,
  Button,
  Descriptions,
  Tag,
  Space,
  Divider
} from 'antd';
import {
  ArrowLeftOutlined,
  EuroOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BankOutlined as HotelOutlined,
  CarOutlined,
  CoffeeOutlined,
  CameraOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  HomeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { IQuotationResults } from '../types';

const { Title, Text } = Typography;

interface QuotationResultsProps {
  results: IQuotationResults;
  onBack: () => void;
  onBackToMyClients: () => void;
}

const QuotationResults: React.FC<QuotationResultsProps> = ({ results, onBack, onBackToMyClients }) => {
  const formatCurrency = (amount: number) => `€${amount.toLocaleString()}`;
  const formatDate = (date: Date) => dayjs(date).format('MMM DD, YYYY');

  const hotelColumns = [
    {
      title: 'Check-in Date',
      dataIndex: 'checkInDate',
      key: 'checkInDate',
      render: (date: Date) => formatDate(date),
      sorter: (a: any, b: any) => dayjs(a.checkInDate).unix() - dayjs(b.checkInDate).unix(),
    },
    {
      title: 'City',
      dataIndex: 'cityName',
      key: 'cityName',
      filters: [...new Set(results.hotels.map(h => h.cityName))].map(city => ({
        text: city,
        value: city,
      })),
      onFilter: (value: any, record: any) => record.cityName === value,
    },
    {
      title: 'Hotel',
      dataIndex: 'referenceHotel',
      key: 'referenceHotel',
    },
    {
      title: 'Nights',
      dataIndex: 'nights',
      key: 'nights',
      sorter: (a: any, b: any) => a.nights - b.nights,
    },
    {
      title: 'Reviews',
      dataIndex: 'reviews',
      key: 'reviews',
      render: (reviews: number) => (
        <Tag color="blue">{reviews.toLocaleString()} reviews</Tag>
      ),
      sorter: (a: any, b: any) => a.reviews - b.reviews,
    },
  ];

  const attractionColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => formatDate(date),
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'City',
      dataIndex: 'cityName',
      key: 'cityName',
      filters: [...new Set(results.attractions.map(a => a.cityName))].map(city => ({
        text: city,
        value: city,
      })),
      onFilter: (value: any, record: any) => record.cityName === value,
    },
    {
      title: 'Attraction',
      dataIndex: 'content',
      key: 'content',
    },
  ];

  const mealColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => formatDate(date),
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'breakfast' ? 'orange' : type === 'lunch' ? 'green' : 'purple'}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
      filters: [
        { text: 'Breakfast', value: 'breakfast' },
        { text: 'Lunch', value: 'lunch' },
        { text: 'Dinner', value: 'dinner' },
      ],
      onFilter: (value: any, record: any) => record.type === value,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (content: string | null) => content || <Text type="secondary">Not specified</Text>,
    },
  ];

  const localGuideColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => formatDate(date),
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'City',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: 'Working Hours',
      dataIndex: 'working_hours',
      key: 'working_hours',
      render: (hours: number | string) => `${hours} hours`,
    },
    {
      title: 'Languages',
      dataIndex: 'languages',
      key: 'languages',
      render: (languages: string[]) => (
        <Space>
          {languages.map(lang => (
            <Tag key={lang} color="geekblue">{lang}</Tag>
          ))}
        </Space>
      ),
    },
  ];

  const serviceColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => formatDate(date),
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'City',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="cyan">{type}</Tag>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (time: Date) => dayjs(time).format('HH:mm'),
    },
    {
      title: 'Itinerary',
      dataIndex: 'itinerary',
      key: 'itinerary',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: string | null) => duration || <Text type="secondary">N/A</Text>,
    },
  ];

  const tripDuration = Math.ceil(
    (results.groupInfo.endDate.getTime() - results.groupInfo.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', padding: '24px' }}>
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
              background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
              margin: '-24px -24px 24px -24px',
              padding: '32px 24px',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
                  <FileTextOutlined style={{ marginRight: '16px' }} />
                  Quotation Results
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                  Complete travel quotation breakdown and analysis
                </Text>
              </div>
              <Space>
                <Button
                  type="primary"
                  ghost
                  icon={<HomeOutlined />}
                  onClick={onBackToMyClients}
                  size="large"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  My Clients
                </Button>
                <Button
                  type="primary"
                  ghost
                  icon={<ArrowLeftOutlined />}
                  onClick={onBack}
                  size="large"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  Back
                </Button>
              </Space>
            </div>
          </div>

          {/* Summary Statistics */}
          <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Cost"
                  value={results.calculations.totalSum}
                  precision={2}
                  valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                  prefix={<EuroOutlined />}
                  suffix="EUR"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Group"
                  value={results.groupInfo.name}
                  valueStyle={{ color: '#52c41a', fontSize: '18px' }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Duration"
                  value={tripDuration}
                  valueStyle={{ color: '#722ed1', fontSize: '24px' }}
                  prefix={<CalendarOutlined />}
                  suffix="days"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Quote Date"
                  value={formatDate(results.groupQuote.quoteDate)}
                  valueStyle={{ color: '#fa8c16', fontSize: '16px' }}
                  prefix={<FileTextOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Client and Company Information */}
          <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <span>Client Information</span>
                  </Space>
                }
                headStyle={{ borderBottom: '2px solid #f0f0f0' }}
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Company">{results.client.companyName}</Descriptions.Item>
                  <Descriptions.Item label="Contact">{results.client.contactName}</Descriptions.Item>
                  <Descriptions.Item label="Email">{results.client.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{results.client.tel}</Descriptions.Item>
                  <Descriptions.Item label="Address">{results.client.address}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <TeamOutlined style={{ color: '#52c41a' }} />
                    <span>Great Line Information</span>
                  </Space>
                }
                headStyle={{ borderBottom: '2px solid #f0f0f0' }}
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Contact">{results.greatLineInfo.contactName}</Descriptions.Item>
                  <Descriptions.Item label="Department">{results.greatLineInfo.department}</Descriptions.Item>
                  <Descriptions.Item label="Email">{results.greatLineInfo.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{results.greatLineInfo.tel}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>

          {/* Cost Breakdown */}
          <Card
            title={
              <Space>
                <EuroOutlined style={{ color: '#1890ff' }} />
                <span>Cost Breakdown</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Row gutter={[16, 16]}>
              {[
                { key: 'hotelSum', label: 'Hotels', icon: <HotelOutlined />, color: '#1890ff' },
                { key: 'transportSum', label: 'Transport', icon: <CarOutlined />, color: '#52c41a' },
                { key: 'mealSum', label: 'Meals', icon: <CoffeeOutlined />, color: '#fa8c16' },
                { key: 'attractionSum', label: 'Attractions', icon: <CameraOutlined />, color: '#722ed1' },
                { key: 'guideSum', label: 'Guides', icon: <TeamOutlined />, color: '#13c2c2' },
                { key: 'localGuideSum', label: 'Local Guides', icon: <EnvironmentOutlined />, color: '#eb2f96' },
              ].map(({ key, label, icon, color }) => (
                <Col xs={24} sm={12} md={8} key={key}>
                  <Card size="small" style={{ textAlign: 'center' }}>
                    <Space direction="vertical">
                      <div style={{ color, fontSize: '24px' }}>{icon}</div>
                      <Text strong>{label}</Text>
                      <Text style={{ fontSize: '18px', fontWeight: 'bold', color }}>
                        {formatCurrency((results.calculations as any)[key])}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                Total: {formatCurrency(results.calculations.totalSum)}
              </Title>
            </div>
          </Card>

          {/* Hotels Table */}
          <Card
            title={
              <Space>
                <HotelOutlined style={{ color: '#1890ff' }} />
                <span>Hotels ({results.hotels.length})</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={hotelColumns}
              dataSource={results.hotels.map((hotel, index) => ({ ...hotel, key: index }))}
              pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
              scroll={{ x: 800 }}
            />
          </Card>

          {/* Attractions Table */}
          <Card
            title={
              <Space>
                <CameraOutlined style={{ color: '#722ed1' }} />
                <span>Attractions ({results.attractions.length})</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={attractionColumns}
              dataSource={results.attractions.map((attraction, index) => ({ ...attraction, key: index }))}
              pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
              scroll={{ x: 600 }}
            />
          </Card>

          {/* Meals Table */}
          <Card
            title={
              <Space>
                <CoffeeOutlined style={{ color: '#fa8c16' }} />
                <span>Meals ({results.meals.length})</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={mealColumns}
              dataSource={results.meals.map((meal, index) => ({ ...meal, key: index }))}
              pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
              scroll={{ x: 600 }}
            />
          </Card>

          {/* Local Guides Table */}
          <Card
            title={
              <Space>
                <TeamOutlined style={{ color: '#13c2c2' }} />
                <span>Local Guides ({results.localGuides.length})</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={localGuideColumns}
              dataSource={results.localGuides.map((guide, index) => ({ ...guide, key: index }))}
              pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
              scroll={{ x: 800 }}
            />
          </Card>

          {/* Services Table */}
          <Card
            title={
              <Space>
                <EnvironmentOutlined style={{ color: '#eb2f96' }} />
                <span>Services ({results.services.length})</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={serviceColumns}
              dataSource={results.services.map((service, index) => ({ ...service, key: index }))}
              pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true }}
              scroll={{ x: 1000 }}
            />
          </Card>

          {/* Offer Details */}
          <Card
            title={
              <Space>
                <FileTextOutlined style={{ color: '#52c41a' }} />
                <span>Offer Details</span>
              </Space>
            }
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Row gutter={[16, 16]}>
              {Object.entries(results.offer).map(([key, value]) => (
                <Col xs={24} sm={12} key={key}>
                  <Card size="small" title={key.replace('_', ' ').toUpperCase()}>
                    <Text>{value}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default QuotationResults;