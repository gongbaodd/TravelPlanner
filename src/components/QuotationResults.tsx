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
  Divider,
  List
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
  HomeOutlined,
  ClockCircleOutlined,
  FlagOutlined,
  ExclamationCircleOutlined
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
  const formatTime = (date: Date) => dayjs(date).format('HH:mm');

  // Generate enhanced services with meals and times
  const generateEnhancedServices = () => {
    const services = [];
    
    // Sort dates to process chronologically
    const sortedDates = [...new Set(results.services.map(s => s.date.getTime()))]
      .sort((a, b) => a - b)
      .map(time => new Date(time));

    sortedDates.forEach((date, dayIndex) => {
      const dayServices = results.services.filter(s => 
        dayjs(s.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
      );
      
      const dayMeals = results.meals.filter(m => 
        dayjs(m.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
      );

      // Morning service (if exists)
      if (dayServices.length > 0) {
        const morningService = dayServices[0];
        services.push({
          key: `service-${dayIndex}-morning`,
          date: date,
          time: new Date(date.getTime() + 8 * 60 * 60 * 1000), // 8:00 AM
          type: 'Transportation',
          description: morningService.itinerary || `Transportation in ${morningService.cityName}`,
          city: morningService.cityName,
          category: 'transport'
        });
      }

      // Add meals throughout the day
      dayMeals.forEach((meal, mealIndex) => {
        let mealTime;
        let mealIcon;
        
        switch (meal.type) {
          case 'breakfast':
            mealTime = new Date(date.getTime() + 7 * 60 * 60 * 1000); // 7:00 AM
            mealIcon = '🥐';
            break;
          case 'lunch':
            mealTime = new Date(date.getTime() + 12 * 60 * 60 * 1000); // 12:00 PM
            mealIcon = '🍽️';
            break;
          case 'dinner':
            mealTime = new Date(date.getTime() + 19 * 60 * 60 * 1000); // 7:00 PM
            mealIcon = '🍷';
            break;
          default:
            mealTime = new Date(date.getTime() + (12 + mealIndex * 2) * 60 * 60 * 1000);
            mealIcon = '🍽️';
        }

        services.push({
          key: `meal-${dayIndex}-${meal.type}`,
          date: date,
          time: mealTime,
          type: `${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}`,
          description: meal.content || `${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)} service`,
          city: dayServices[0]?.cityName || 'Various',
          category: 'meal',
          icon: mealIcon
        });
      });

      // Add attractions for the day
      const dayAttractions = results.attractions.filter(a => 
        dayjs(a.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
      );

      dayAttractions.forEach((attraction, attractionIndex) => {
        services.push({
          key: `attraction-${dayIndex}-${attractionIndex}`,
          date: date,
          time: new Date(date.getTime() + (10 + attractionIndex * 3) * 60 * 60 * 1000), // Starting from 10:00 AM
          type: 'Attraction Visit',
          description: attraction.content,
          city: attraction.cityName,
          category: 'attraction'
        });
      });

      // Evening service (if multiple services exist)
      if (dayServices.length > 1) {
        const eveningService = dayServices[dayServices.length - 1];
        services.push({
          key: `service-${dayIndex}-evening`,
          date: date,
          time: new Date(date.getTime() + 18 * 60 * 60 * 1000), // 6:00 PM
          type: 'Return Transportation',
          description: `Return to hotel in ${eveningService.cityName}`,
          city: eveningService.cityName,
          category: 'transport'
        });
      }
    });

    return services.sort((a, b) => a.time.getTime() - b.time.getTime());
  };

  const enhancedServices = generateEnhancedServices();

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

  const enhancedServiceColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => formatDate(date),
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (time: Date) => (
        <Space>
          <ClockCircleOutlined style={{ color: '#1890ff' }} />
          <Text strong>{formatTime(time)}</Text>
        </Space>
      ),
      sorter: (a: any, b: any) => a.time.getTime() - b.time.getTime(),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      filters: [...new Set(enhancedServices.map(s => s.city))].map(city => ({
        text: city,
        value: city,
      })),
      onFilter: (value: any, record: any) => record.city === value,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, record: any) => {
        let color = 'blue';
        let icon = <CarOutlined />;
        
        if (record.category === 'meal') {
          color = 'orange';
          icon = <CoffeeOutlined />;
        } else if (record.category === 'attraction') {
          color = 'purple';
          icon = <CameraOutlined />;
        } else if (record.category === 'transport') {
          color = 'green';
          icon = <CarOutlined />;
        }

        return (
          <Tag color={color} icon={icon}>
            {record.icon && <span style={{ marginRight: '4px' }}>{record.icon}</span>}
            {type}
          </Tag>
        );
      },
      filters: [
        { text: 'Transportation', value: 'transport' },
        { text: 'Meals', value: 'meal' },
        { text: 'Attractions', value: 'attraction' },
      ],
      onFilter: (value: any, record: any) => record.category === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => <Text>{description}</Text>,
    },
  ];

  const tripDuration = Math.ceil(
    (results.groupInfo.endDate.getTime() - results.groupInfo.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Offer exclusions data
  const offerExclusions = [
    'International and domestic airfares, airport taxes.',
    'Visa fees, personal expenses (laundry, telephone etc.)',
    'Anything else not specified in the itinerary.',
    'Driver and tour guide working hours：10H per day，Overtime：Driver 50Eur per hour，Tour guide 50Eur per hour.',
    'Any meals change and cancellation requested to inform us 72 hours, otherwise no change and FOC',
    'All timings are subject to local traffic conditions.',
    'Currency fluctuations of more than 3% or changes in local government taxes may result in price changes.',
    'Prices are not applicable on fair dates. We reserve the right to apply supplements or confirm hotels outside the affected city or in alternative cities should the tour include cities affected by a trade fair.',
    'Unless otherwise specified, parking, permits and tolls are included. These are quoted at rates applicable at the time of our offer. These rates may be increased by local councils at any time without notice. As this is out of GREAT LINE Travel\'s control, we reserve the right to add a surcharge for any additional costs if necessary.'
  ];

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

          {/* Group Information */}
          <Card
            title={
              <Space>
                <FlagOutlined style={{ color: '#722ed1' }} />
                <span>Group Information</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Group Number</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{results.groupInfo.number}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Group Name</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{results.groupInfo.name}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Start Date</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{formatDate(results.groupInfo.startDate)}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">End Date</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{formatDate(results.groupInfo.endDate)}</div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Group Type</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    <Tag color="blue">{results.groupInfo.type.charAt(0).toUpperCase() + results.groupInfo.type.slice(1)}</Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <div>
                  <Text type="secondary">Duration</Text>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{tripDuration} days</div>
                </div>
              </Col>
            </Row>
          </Card>

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

          {/* Enhanced Daily Services & Itinerary */}
          <Card
            title={
              <Space>
                <ClockCircleOutlined style={{ color: '#eb2f96' }} />
                <span>Daily Itinerary & Services ({enhancedServices.length} activities)</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <Table
              columns={enhancedServiceColumns}
              dataSource={enhancedServices}
              pagination={{ pageSize: 15, showSizeChanger: true, showQuickJumper: true }}
              scroll={{ x: 1000 }}
              size="small"
            />
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

          {/* Offer Details */}
          <Card
            title={
              <Space>
                <FileTextOutlined style={{ color: '#52c41a' }} />
                <span>Offer Details</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
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

          {/* Offer Exclusions */}
          <Card
            title={
              <Space>
                <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                <span>Offer Exclusions</span>
              </Space>
            }
            style={{ marginBottom: '32px' }}
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
          >
            <div style={{ 
              background: '#fff2f0', 
              border: '1px solid #ffccc7', 
              borderRadius: '8px', 
              padding: '16px',
              marginBottom: '16px'
            }}>
              <Text strong style={{ color: '#ff4d4f' }}>
                ⚠️ Important: The following items are NOT included in this quotation
              </Text>
            </div>
            
            <List
              dataSource={offerExclusions}
              renderItem={(item, index) => (
                <List.Item style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Space align="start">
                    <Text strong style={{ color: '#ff4d4f', minWidth: '20px' }}>
                      {index + 1}.
                    </Text>
                    <Text>{item}</Text>
                  </Space>
                </List.Item>
              )}
              style={{ 
                background: '#fafafa', 
                padding: '16px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9'
              }}
            />
            
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              background: '#f6ffed', 
              border: '1px solid #b7eb8f',
              borderRadius: '6px'
            }}>
              <Text style={{ fontSize: '12px', color: '#389e0d' }}>
                <strong>Note:</strong> Please review these exclusions carefully. Any additional services or changes 
                to the itinerary may result in extra charges. For clarification on any excluded items, 
                please contact your Great Line Travel representative.
              </Text>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default QuotationResults;