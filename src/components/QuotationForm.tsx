import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Card,
  Row,
  Col,
  Divider,
  Space,
  Typography,
  Collapse,
  Switch,
  message,
  Tooltip
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
  SaveOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { IQuotation, IQuote } from '../types';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

interface QuotationFormProps {
  onSubmit: (quotation: IQuotation) => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [quotes, setQuotes] = useState<IQuote[]>([]);

  const createEmptyQuote = (): IQuote => ({
    date: new Date(),
    dayCount: 1,
    cityName: '',
    transportCost: { count: 0, currency: 'EUR' },
    hotel: {
      stars: 3,
      reference: '',
      ppPrice: { count: 0, currency: 'EUR', type: 'Person' },
      singleRoom: {
        count: 0,
        ppPrice: { count: 0, currency: 'EUR', type: 'Person' }
      }
    },
    meals: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    attractions: {
      name: '',
      ppPrice: { count: 0, currency: 'EUR', type: 'Person' }
    },
    guide: { count: 0, currency: 'EUR' },
    water: { count: 0, currency: 'EUR', type: 'Person' },
    localGuide: {
      tip: { count: 0, currency: 'EUR', type: 'Person' },
      salary: { count: 0, currency: 'EUR' },
      accomadation: { count: 0, currency: 'EUR' },
      meal: { count: 0, currency: 'EUR' }
    },
    extra: ''
  });

  const addQuote = () => {
    const newQuote = createEmptyQuote();
    setQuotes([...quotes, newQuote]);
    message.success('New daily quote added');
  };

  const removeQuote = (index: number) => {
    const newQuotes = quotes.filter((_, i) => i !== index);
    setQuotes(newQuotes);
    message.success('Daily quote removed');
  };

  const updateQuote = (index: number, field: string, value: any) => {
    const newQuotes = [...quotes];
    if (field.includes('.')) {
      const fields = field.split('.');
      let current: any = newQuotes[index];
      for (let i = 0; i < fields.length - 1; i++) {
        current = current[fields[i]];
      }
      current[fields[fields.length - 1]] = value;
    } else {
      (newQuotes[index] as any)[field] = value;
    }
    setQuotes(newQuotes);
  };

  const handleMealChange = (quoteIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', enabled: boolean, price?: number) => {
    const newQuotes = [...quotes];
    if (enabled && price !== undefined) {
      newQuotes[quoteIndex].meals[mealType] = {
        ppPrice: { count: price, currency: 'EUR', type: 'Person' }
      };
    } else {
      newQuotes[quoteIndex].meals[mealType] = null;
    }
    setQuotes(newQuotes);
  };

  const onFinish = (values: any) => {
    const quotationData: IQuotation = {
      ...values,
      date: values.date.toDate(),
      quotes: quotes.map(quote => ({
        ...quote,
        date: dayjs(quote.date).toDate()
      })),
      details: values.details || {
        transport: '',
        hotel: '',
        meal: '',
        attraction: '',
        guide: '',
        extra: ''
      }
    };

    onSubmit(quotationData);
    message.success('Quotation generated successfully!');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px' }}>
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
              background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
              margin: '-24px -24px 24px -24px',
              padding: '32px 24px',
              color: 'white'
            }}
          >
            <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
              <CalendarOutlined style={{ marginRight: '16px' }} />
              Travel Quotation System
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
              Create detailed travel quotations with precision and elegance
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              date: dayjs(),
              singleRoomFactor: 1,
              allNum: 0,
              leadNum: 0
            }}
          >
            {/* Basic Information */}
            <Card
              title={
                <Space>
                  <UserOutlined style={{ color: '#1890ff' }} />
                  <span>Basic Information</span>
                </Space>
              }
              style={{ marginBottom: '24px' }}
              headStyle={{ borderBottom: '2px solid #f0f0f0' }}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Total Number of People"
                    name="allNum"
                    rules={[{ required: true, message: 'Please enter total number' }]}
                  >
                    <InputNumber
                      min={1}
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="Enter total number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Lead Number"
                    name="leadNum"
                    rules={[{ required: true, message: 'Please enter lead number' }]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="Enter lead number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Car Type"
                    name="carType"
                    rules={[{ required: true, message: 'Please enter car type' }]}
                  >
                    <Input size="large" placeholder="e.g., Bus, Van, Car" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label={
                      <Space>
                        Single Room Factor
                        <Tooltip title="Multiplier for single room pricing">
                          <InfoCircleOutlined />
                        </Tooltip>
                      </Space>
                    }
                    name="singleRoomFactor"
                  >
                    <InputNumber
                      min={0.1}
                      step={0.1}
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="1.0"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Group Name"
                    name="groupName"
                    rules={[{ required: true, message: 'Please enter group name' }]}
                  >
                    <Input size="large" placeholder="Enter group name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Group Number"
                    name="groupNumber"
                    rules={[{ required: true, message: 'Please enter group number' }]}
                  >
                    <Input size="large" placeholder="Enter group number" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Operator"
                    name="operator"
                    rules={[{ required: true, message: 'Please enter operator name' }]}
                  >
                    <Input size="large" placeholder="Enter operator name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: 'Please select date' }]}
                  >
                    <DatePicker size="large" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Daily Quotes */}
            <Card
              title={
                <Space>
                  <CalendarOutlined style={{ color: '#52c41a' }} />
                  <span>Daily Quotes</span>
                </Space>
              }
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addQuote}
                  size="large"
                >
                  Add Daily Quote
                </Button>
              }
              style={{ marginBottom: '24px' }}
              headStyle={{ borderBottom: '2px solid #f0f0f0' }}
            >
              {quotes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  <CalendarOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                  <div>No daily quotes added yet. Click "Add Daily Quote" to get started.</div>
                </div>
              ) : (
                <Collapse accordion>
                  {quotes.map((quote, index) => (
                    <Panel
                      header={
                        <Space>
                          <strong>Day {index + 1}</strong>
                          <Text type="secondary">
                            {quote.cityName || 'No city specified'} - {dayjs(quote.date).format('MMM DD, YYYY')}
                          </Text>
                        </Space>
                      }
                      key={index}
                      extra={
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuote(index);
                          }}
                        />
                      }
                    >
                      <Row gutter={[16, 16]}>
                        {/* Basic Day Info */}
                        <Col span={24}>
                          <Title level={5}>Basic Information</Title>
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Date</label>
                          <DatePicker
                            value={dayjs(quote.date)}
                            onChange={(date) => updateQuote(index, 'date', date?.toDate())}
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Day Count</label>
                          <InputNumber
                            min={1}
                            value={quote.dayCount}
                            onChange={(value) => updateQuote(index, 'dayCount', value)}
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>City Name</label>
                          <Select
                            value={quote.cityName}
                            onChange={(value) => updateQuote(index, 'cityName', value)}
                            style={{ width: '100%' }}
                            showSearch
                            allowClear
                            placeholder="Select or enter city"
                            options={[
                              { value: 'FLY', label: 'FLY' },
                              { value: 'EMPTY DRIVING', label: 'EMPTY DRIVING' }
                            ]}
                            dropdownRender={(menu) => (
                              <div>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Input
                                  placeholder="Enter custom city name"
                                  onPressEnter={(e) => {
                                    const value = (e.target as HTMLInputElement).value;
                                    if (value) {
                                      updateQuote(index, 'cityName', value);
                                    }
                                  }}
                                />
                              </div>
                            )}
                          />
                        </Col>

                        {/* Transport */}
                        <Col span={24}>
                          <Divider />
                          <Title level={5}>
                            <CarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            Transport & Hotel
                          </Title>
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Transport Cost (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.transportCost.count}
                            onChange={(value) => updateQuote(index, 'transportCost.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Hotel Stars</label>
                          <Select
                            value={quote.hotel.stars}
                            onChange={(value) => updateQuote(index, 'hotel.stars', value)}
                            style={{ width: '100%' }}
                          >
                            {[1, 2, 3, 4, 5].map(star => (
                              <Select.Option key={star} value={star}>
                                {star} Star{star > 1 ? 's' : ''}
                              </Select.Option>
                            ))}
                          </Select>
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Hotel Reference</label>
                          <Input
                            value={quote.hotel.reference}
                            onChange={(e) => updateQuote(index, 'hotel.reference', e.target.value)}
                            placeholder="Hotel name or reference"
                          />
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Hotel PP Price (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.hotel.ppPrice.count}
                            onChange={(value) => updateQuote(index, 'hotel.ppPrice.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Single Room Count</label>
                          <InputNumber
                            min={0}
                            value={quote.hotel.singleRoom.count}
                            onChange={(value) => updateQuote(index, 'hotel.singleRoom.count', value)}
                            style={{ width: '100%' }}
                          />
                        </Col>
                        <Col xs={24} sm={8}>
                          <label>Single Room PP Price (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.hotel.singleRoom.ppPrice.count}
                            onChange={(value) => updateQuote(index, 'hotel.singleRoom.ppPrice.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>

                        {/* Meals */}
                        <Col span={24}>
                          <Divider />
                          <Title level={5}>Meals</Title>
                        </Col>
                        {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                          <Col xs={24} sm={8} key={mealType}>
                            <Card size="small" title={mealType.charAt(0).toUpperCase() + mealType.slice(1)}>
                              <Space direction="vertical" style={{ width: '100%' }}>
                                <Switch
                                  checked={quote.meals[mealType as keyof typeof quote.meals] !== null}
                                  onChange={(checked) => {
                                    if (checked) {
                                      handleMealChange(index, mealType as any, true, 0);
                                    } else {
                                      handleMealChange(index, mealType as any, false);
                                    }
                                  }}
                                  checkedChildren="Included"
                                  unCheckedChildren="Not included"
                                />
                                {quote.meals[mealType as keyof typeof quote.meals] && (
                                  <InputNumber
                                    min={0}
                                    value={quote.meals[mealType as keyof typeof quote.meals]?.ppPrice.count}
                                    onChange={(value) => handleMealChange(index, mealType as any, true, value || 0)}
                                    style={{ width: '100%' }}
                                    placeholder="Price per person"
                                    formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                                  />
                                )}
                              </Space>
                            </Card>
                          </Col>
                        ))}

                        {/* Attractions & Guides */}
                        <Col span={24}>
                          <Divider />
                          <Title level={5}>Attractions & Guides</Title>
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Attraction Name</label>
                          <Input
                            value={quote.attractions.name}
                            onChange={(e) => updateQuote(index, 'attractions.name', e.target.value)}
                            placeholder="Attraction or activity name"
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Attraction PP Price (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.attractions.ppPrice.count}
                            onChange={(value) => updateQuote(index, 'attractions.ppPrice.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Guide Price (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.guide.count}
                            onChange={(value) => updateQuote(index, 'guide.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Water PP Price (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.water.count}
                            onChange={(value) => updateQuote(index, 'water.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>

                        {/* Local Guide */}
                        <Col span={24}>
                          <Divider />
                          <Title level={5}>Local Guide</Title>
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Tip Amount (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.localGuide.tip.count}
                            onChange={(value) => updateQuote(index, 'localGuide.tip.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Tip Type</label>
                          <Select
                            value={quote.localGuide.tip.type}
                            onChange={(value) => updateQuote(index, 'localGuide.tip.type', value)}
                            style={{ width: '100%' }}
                          >
                            <Select.Option value="Person">Per Person</Select.Option>
                            <Select.Option value="Group">Per Group</Select.Option>
                          </Select>
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Salary (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.localGuide.salary.count}
                            onChange={(value) => updateQuote(index, 'localGuide.salary.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Accommodation (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.localGuide.accomadation.count}
                            onChange={(value) => updateQuote(index, 'localGuide.accomadation.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <label>Meal (EUR)</label>
                          <InputNumber
                            min={0}
                            value={quote.localGuide.meal.count}
                            onChange={(value) => updateQuote(index, 'localGuide.meal.count', value)}
                            style={{ width: '100%' }}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/€\s?|(,*)/g, '')}
                          />
                        </Col>

                        {/* Extra Notes */}
                        <Col span={24}>
                          <label>Extra Notes</label>
                          <TextArea
                            value={quote.extra}
                            onChange={(e) => updateQuote(index, 'extra', e.target.value)}
                            rows={3}
                            placeholder="Additional notes or special requirements"
                          />
                        </Col>
                      </Row>
                    </Panel>
                  ))}
                </Collapse>
              )}
            </Card>

            {/* Additional Details */}
            <Card
              title="Additional Details"
              style={{ marginBottom: '24px' }}
              headStyle={{ borderBottom: '2px solid #f0f0f0' }}
            >
              <Row gutter={[16, 16]}>
                {['transport', 'hotel', 'meal', 'attraction', 'guide', 'extra'].map((detail) => (
                  <Col xs={24} sm={12} key={detail}>
                    <Form.Item
                      label={detail.charAt(0).toUpperCase() + detail.slice(1) + ' Details'}
                      name={['details', detail]}
                    >
                      <TextArea
                        rows={3}
                        placeholder={`Enter ${detail} details and specifications`}
                      />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Card>

            {/* Submit Button */}
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SaveOutlined />}
                style={{
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
                }}
              >
                Generate Quotation
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default QuotationForm;