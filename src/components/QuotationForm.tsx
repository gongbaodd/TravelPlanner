import React, { useState, useCallback, useMemo } from 'react';
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Card,
  Row,
  Col,
  Space,
  Typography,
  message,
  Tooltip,
  Select
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined,
  SaveOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  TableOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community';
import dayjs from 'dayjs';
import { IQuotation, TGroupType } from '../types';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface QuotationFormProps {
  onSubmit: (quotation: IQuotation) => void;
  onBack: () => void;
}

interface DailyQuoteRow {
  id: string;
  date: string;
  duration: number;
  city: string;
  transport: number;
  hotelStars: number;
  referenceHotel: string;
  hotelCost: number;
  singleRoomCount: number;
  singleRoomCost: number;
  singleRoomCostSum: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  attractionName: string;
  attractionCost: number;
  guideCost: number;
  waterCost: number;
  localGuideTip: number;
  localGuideSalary: number;
  localGuideAccommodation: number;
  localGuideMeal: number;
  extra: string;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ onSubmit, onBack }) => {
  const [form] = Form.useForm();

  const createEmptyRow = (index: number = 0): DailyQuoteRow => ({
    id: `row-${index}-${Date.now()}`,
    date: dayjs().add(index, 'day').format('YYYY-MM-DD'),
    duration: 1,
    city: '',
    transport: 0,
    hotelStars: 3,
    referenceHotel: '',
    hotelCost: 0,
    singleRoomCount: 0,
    singleRoomCost: 0,
    singleRoomCostSum: 0,
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    attractionName: '',
    attractionCost: 0,
    guideCost: 0,
    waterCost: 0,
    localGuideTip: 0,
    localGuideSalary: 0,
    localGuideAccommodation: 0,
    localGuideMeal: 0,
    extra: ''
  });

  // Initialize with 10 empty rows
  const [rows, setRows] = useState<DailyQuoteRow[]>(() => 
    Array.from({ length: 10 }, (_, index) => createEmptyRow(index))
  );

  const addRow = () => {
    const newRow = createEmptyRow(rows.length);
    setRows([...rows, newRow]);
    message.success('New daily quote added');
  };

  const removeLastRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
      message.success('Daily quote removed');
    } else {
      message.warning('At least one row is required');
    }
  };

  // Currency cell renderer
  const currencyCellRenderer = (params: any) => {
    if (params.value === null || params.value === undefined || params.value === 0) {
      return '';
    }
    return `€${params.value.toLocaleString()}`;
  };

  // Stars cell renderer
  const starsCellRenderer = (params: any) => {
    if (params.value === null || params.value === undefined) {
      return '';
    }
    return '⭐'.repeat(Math.max(1, Math.min(5, params.value)));
  };

  // Duration cell renderer
  const durationCellRenderer = (params: any) => {
    if (params.value === null || params.value === undefined) {
      return '';
    }
    return `${params.value} day(s)`;
  };

  const columnDefs: ColDef<DailyQuoteRow>[] = useMemo(() => [
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      editable: true,
      resizable: true,
      sortable: true
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 100,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: durationCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 1,
        max: 30
      }
    },
    {
      field: 'city',
      headerName: 'City',
      width: 120,
      editable: true,
      resizable: true,
      sortable: true
    },
    {
      field: 'transport',
      headerName: 'Transport (EUR)',
      width: 140,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'hotelStars',
      headerName: 'Hotel Stars',
      width: 110,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: starsCellRenderer,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [1, 2, 3, 4, 5]
      }
    },
    {
      field: 'referenceHotel',
      headerName: 'Reference Hotel',
      width: 160,
      editable: true,
      resizable: true,
      sortable: true
    },
    {
      field: 'hotelCost',
      headerName: 'Hotel Cost',
      width: 120,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'singleRoomCount',
      headerName: 'Single Room Count',
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'singleRoomCost',
      headerName: 'Single Room Cost',
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'singleRoomCostSum',
      headerName: 'Single Room Sum',
      width: 150,
      resizable: true,
      sortable: true,
      editable: false,
      cellRenderer: (params: any) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          €{(params.value || 0).toLocaleString()}
        </span>
      ),
      cellStyle: { backgroundColor: '#f0f8ff' }
    },
    {
      field: 'breakfast',
      headerName: 'Breakfast',
      width: 110,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'lunch',
      headerName: 'Lunch',
      width: 110,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'dinner',
      headerName: 'Dinner',
      width: 110,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'attractionName',
      headerName: 'Attraction Name',
      width: 160,
      editable: true,
      resizable: true,
      sortable: true
    },
    {
      field: 'attractionCost',
      headerName: 'Attraction Cost',
      width: 140,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'guideCost',
      headerName: 'Guide Cost',
      width: 120,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'waterCost',
      headerName: 'Water Cost',
      width: 120,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'localGuideTip',
      headerName: 'Local Guide Tip',
      width: 140,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'localGuideSalary',
      headerName: 'Local Guide Salary',
      width: 160,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'localGuideAccommodation',
      headerName: 'Local Guide Accommodation',
      width: 190,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'localGuideMeal',
      headerName: 'Local Guide Meal',
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      cellRenderer: currencyCellRenderer,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0
      }
    },
    {
      field: 'extra',
      headerName: 'Extra',
      width: 150,
      editable: true,
      resizable: true,
      sortable: true
    }
  ], []);

  const onCellValueChanged = useCallback((event: CellValueChangedEvent<DailyQuoteRow>) => {
    const { data, colDef } = event;
    
    // Auto-calculate single room cost sum when count or cost changes
    if (colDef.field === 'singleRoomCount' || colDef.field === 'singleRoomCost') {
      const updatedData = {
        ...data,
        singleRoomCostSum: (data.singleRoomCount || 0) * (data.singleRoomCost || 0)
      };
      
      setRows(prevRows => 
        prevRows.map(row => 
          row.id === data.id ? updatedData : row
        )
      );
    }
  }, []);

  const convertRowsToQuotes = (rows: DailyQuoteRow[]) => {
    // Filter out completely empty rows
    const validRows = rows.filter(row => 
      row.city.trim() !== '' || 
      row.transport > 0 || 
      row.hotelCost > 0 || 
      row.attractionName.trim() !== ''
    );

    return validRows.map(row => ({
      date: dayjs(row.date).toDate(),
      dayCount: row.duration,
      cityName: row.city || 'FLY',
      transportCost: { count: row.transport, currency: 'EUR' as const },
      hotel: {
        stars: row.hotelStars,
        reference: row.referenceHotel,
        ppPrice: { count: row.hotelCost, currency: 'EUR' as const, type: 'Person' as const },
        singleRoom: {
          count: row.singleRoomCount,
          ppPrice: { count: row.singleRoomCost, currency: 'EUR' as const, type: 'Person' as const }
        }
      },
      meals: {
        breakfast: row.breakfast > 0 ? { ppPrice: { count: row.breakfast, currency: 'EUR' as const, type: 'Person' as const } } : null,
        lunch: row.lunch > 0 ? { ppPrice: { count: row.lunch, currency: 'EUR' as const, type: 'Person' as const } } : null,
        dinner: row.dinner > 0 ? { ppPrice: { count: row.dinner, currency: 'EUR' as const, type: 'Person' as const } } : null
      },
      attractions: {
        name: row.attractionName,
        ppPrice: { count: row.attractionCost, currency: 'EUR' as const, type: 'Person' as const }
      },
      guide: { count: row.guideCost, currency: 'EUR' as const },
      water: { count: row.waterCost, currency: 'EUR' as const, type: 'Person' as const },
      localGuide: {
        tip: { count: row.localGuideTip, currency: 'EUR' as const, type: 'Person' as const },
        salary: { count: row.localGuideSalary, currency: 'EUR' as const },
        accomadation: { count: row.localGuideAccommodation, currency: 'EUR' as const },
        meal: { count: row.localGuideMeal, currency: 'EUR' as const }
      },
      extra: row.extra
    }));
  };

  const onFinish = (values: any) => {
    const validQuotes = convertRowsToQuotes(rows);
    
    if (validQuotes.length === 0) {
      message.error('Please fill in at least one daily quote with valid data');
      return;
    }

    const quotationData: IQuotation = {
      ...values,
      date: values.date.toDate(),
      quotes: validQuotes,
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

  const totalRows = rows.length;
  const totalCost = rows.reduce((sum, row) => 
    sum + row.transport + row.hotelCost + row.singleRoomCostSum + 
    row.breakfast + row.lunch + row.dinner + row.attractionCost + 
    row.guideCost + row.waterCost + row.localGuideTip + 
    row.localGuideSalary + row.localGuideAccommodation + row.localGuideMeal, 0
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px' }}>
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
                  <CalendarOutlined style={{ marginRight: '16px' }} />
                  Travel Quotation System
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                  Create detailed travel quotations with AG Grid
                </Text>
              </div>
              <Button
                type="primary"
                ghost
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                size="large"
                style={{ borderColor: 'white', color: 'white' }}
              >
                Go Back
              </Button>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              date: dayjs(),
              singleRoomFactor: 1,
              allNum: 0,
              leadNum: 0,
              groupType: 'single',
              startDate: dayjs(),
              endDate: dayjs().add(7, 'day')
            }}
          >
            {/* Group Information */}
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
                <Col xs={24} sm={12} md={8}>
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

                <Col xs={24} sm={12} md={8}>
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

                <Col xs={24} sm={12} md={8}>
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

                <Col xs={24} sm={12} md={8}>
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

                <Col xs={24} sm={12} md={8}>
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

            {/* Daily Quotes AG Grid */}
            <Card
              title={
                <Space>
                  <TableOutlined style={{ color: '#52c41a' }} />
                  <span>Daily Quotes ({totalRows} rows)</span>
                  {totalCost > 0 && (
                    <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>
                      Total: €{totalCost.toLocaleString()}
                    </Text>
                  )}
                </Space>
              }
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addRow}
                    size="large"
                  >
                    Add Row
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={removeLastRow}
                    size="large"
                    disabled={rows.length <= 1}
                  >
                    Remove Last
                  </Button>
                </Space>
              }
              style={{ marginBottom: '24px' }}
              headStyle={{ borderBottom: '2px solid #f0f0f0' }}
            >
              <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                <AgGridReact<DailyQuoteRow>
                  rowData={rows}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    filter: true,
                    resizable: true,
                    editable: true
                  }}
                  onCellValueChanged={onCellValueChanged}
                  suppressRowClickSelection={true}
                  enableFillHandle={true}
                  undoRedoCellEditing={true}
                  undoRedoCellEditingLimit={20}
                  stopEditingWhenCellsLoseFocus={true}
                  enterNavigatesVertically={true}
                  enterNavigatesVerticallyAfterEdit={true}
                  suppressMovableColumns={false}
                  animateRows={true}
                  rowSelection="multiple"
                  getRowId={(params) => params.data.id}
                />
              </div>
              
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                background: '#f6f6f6', 
                borderRadius: '6px',
                fontSize: '12px',
                color: '#666'
              }}>
                <strong>💡 AG Grid Features:</strong>
                <br />
                • Click on any cell to edit the value
                <br />
                • Single Room Cost Sum is calculated automatically (Count × Cost)
                <br />
                • Use Ctrl+C/Ctrl+V to copy/paste data from Excel
                <br />
                • Drag column headers to reorder, resize columns by dragging edges
                <br />
                • Use Tab/Enter to navigate between cells, Undo/Redo with Ctrl+Z/Ctrl+Y
              </div>
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
                  boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
                  minWidth: '200px'
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