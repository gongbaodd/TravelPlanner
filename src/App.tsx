import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import LoginPage from './components/LoginPage';
import CreateClientPage from './components/CreateClientPage';
import QuotationListPage from './components/QuotationListPage';
import QuotationForm from './components/QuotationForm';
import QuotationResults from './components/QuotationResults';
import { IQuotation, IQuotationResults, IClientInfo, IUser } from './types';
import { calculateQuotationTotals } from './utils/calculations';

type AppView = 'login' | 'createClient' | 'quotationList' | 'quotationForm' | 'quotationResults';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [currentClient, setCurrentClient] = useState<IClientInfo | null>(null);
  const [quotationResults, setQuotationResults] = useState<IQuotationResults | null>(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock user creation
    const user: IUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0]
    };
    setCurrentUser(user);
    setCurrentView('createClient');
  };

  const handleClientSubmit = (client: IClientInfo) => {
    setCurrentClient(client);
    setCurrentView('quotationList');
  };

  const handleAddNewQuotation = () => {
    setCurrentView('quotationForm');
  };

  const handleViewQuotation = (quotationId: string) => {
    setSelectedQuotationId(quotationId);
    // In a real app, you would fetch the quotation data here
    // For now, we'll just show the form or generate mock results
    if (quotationId === '1') {
      // Show existing quotation results
      generateMockResults();
    } else {
      // Show form for editing
      setCurrentView('quotationForm');
    }
  };

  const generateMockResults = () => {
    if (!currentClient) return;

    const mockResults: IQuotationResults = {
      id: '1',
      client: currentClient,
      greatLineInfo: {
        contactName: currentUser?.name || 'Travel Operator',
        department: 'Travel Operations',
        tel: '+1-555-0123',
        email: currentUser?.email || 'operations@greatline.com'
      },
      groupInfo: {
        number: 'GRP001',
        name: 'European Tour Group A',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-25'),
        type: 'single'
      },
      groupQuote: {
        quotes: [
          {
            ppPrice: 1575.00,
            currency: 'EUR',
            content: 'Complete 10-day European tour package for 10 people'
          }
        ],
        quoteDate: new Date(),
        validateDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      offer: {
        hotel: '4-star hotels with breakfast included',
        transport: 'Luxury coach transportation throughout the tour',
        meals: 'Daily breakfast, 5 lunches, and 7 dinners included',
        attractions: 'All major attractions and museums entrance fees',
        guides: 'Professional English-speaking guides',
        tips: 'All service tips included',
        bottled_water: 'Complimentary bottled water during tours'
      },
      hotels: [
        {
          checkInDate: new Date('2024-03-15'),
          cityName: 'Paris',
          referenceHotel: 'Hotel Louvre Rivoli',
          nights: 3,
          reviews: 1250
        },
        {
          checkInDate: new Date('2024-03-18'),
          cityName: 'Rome',
          referenceHotel: 'Hotel Artemide',
          nights: 3,
          reviews: 980
        },
        {
          checkInDate: new Date('2024-03-21'),
          cityName: 'Barcelona',
          referenceHotel: 'Hotel Casa Fuster',
          nights: 3,
          reviews: 1100
        }
      ],
      attractions: [
        {
          cityName: 'Paris',
          date: new Date('2024-03-16'),
          content: 'Eiffel Tower and Seine River Cruise'
        },
        {
          cityName: 'Rome',
          date: new Date('2024-03-19'),
          content: 'Colosseum and Vatican Museums'
        },
        {
          cityName: 'Barcelona',
          date: new Date('2024-03-22'),
          content: 'Sagrada Familia and Park Güell'
        }
      ],
      meals: [
        {
          date: new Date('2024-03-16'),
          type: 'lunch',
          content: 'Traditional French cuisine at Le Procope'
        },
        {
          date: new Date('2024-03-19'),
          type: 'dinner',
          content: 'Italian dinner with wine tasting'
        },
        {
          date: new Date('2024-03-22'),
          type: 'lunch',
          content: 'Spanish tapas tour'
        }
      ],
      localGuides: [
        {
          date: new Date('2024-03-16'),
          cityName: 'Paris',
          working_hours: 8,
          languages: ['English', 'French']
        },
        {
          date: new Date('2024-03-19'),
          cityName: 'Rome',
          working_hours: 8,
          languages: ['English', 'Italian']
        },
        {
          date: new Date('2024-03-22'),
          cityName: 'Barcelona',
          working_hours: 8,
          languages: ['English', 'Spanish']
        }
      ],
      services: [
        {
          date: new Date('2024-03-15'),
          cityName: 'Paris',
          type: 'Airport Transfer',
          time: new Date('2024-03-15T14:00:00'),
          itinerary: 'Charles de Gaulle Airport to Hotel',
          duration: '1 hour'
        },
        {
          date: new Date('2024-03-18'),
          cityName: 'Rome',
          type: 'City Transfer',
          time: new Date('2024-03-18T09:00:00'),
          itinerary: 'Paris to Rome via high-speed train',
          duration: '11 hours'
        }
      ],
      calculations: {
        hotelSum: 4500.00,
        transportSum: 3200.00,
        mealSum: 2800.00,
        localGuideMealSum: 450.00,
        attractionSum: 1200.00,
        guideSum: 2400.00,
        localGuideSum: 900.00,
        localGuideAccSum: 300.00,
        waterSum: 100.00,
        totalSum: 15750.00
      }
    };

    setQuotationResults(mockResults);
    setCurrentView('quotationResults');
  };

  const handleQuotationSubmit = (quotation: IQuotation) => {
    if (!currentClient) return;

    const calculations = calculateQuotationTotals(quotation);
    
    const results: IQuotationResults = {
      client: currentClient,
      greatLineInfo: {
        contactName: quotation.operator,
        department: 'Travel Operations',
        tel: '+1-555-0123',
        email: currentUser?.email || 'operations@greatline.com'
      },
      groupInfo: {
        number: quotation.groupNumber,
        name: quotation.groupName,
        startDate: quotation.quotes.length > 0 ? quotation.quotes[0].date : quotation.date,
        endDate: quotation.quotes.length > 0 ? quotation.quotes[quotation.quotes.length - 1].date : quotation.date,
        type: 'single'
      },
      groupQuote: {
        quotes: [
          {
            ppPrice: calculations.totalSum / quotation.allNum,
            currency: 'EUR',
            content: `Complete travel package for ${quotation.allNum} people`
          }
        ],
        quoteDate: quotation.date,
        validateDate: new Date(quotation.date.getTime() + 30 * 24 * 60 * 60 * 1000)
      },
      offer: {
        hotel: quotation.details.hotel || 'Hotel accommodation as per itinerary',
        transport: quotation.details.transport || `Transportation by ${quotation.carType}`,
        meals: quotation.details.meal || 'Meals as specified in the program',
        attractions: quotation.details.attraction || 'Entrance fees to attractions included',
        guides: quotation.details.guide || 'Professional guide services',
        tips: 'Tips for local guides included',
        bottled_water: 'Complimentary bottled water during tours'
      },
      hotels: quotation.quotes
        .filter(quote => quote.hotel.reference)
        .map(quote => ({
          checkInDate: quote.date,
          cityName: quote.cityName,
          referenceHotel: quote.hotel.reference,
          nights: quote.dayCount,
          reviews: Math.floor(Math.random() * 1000) + 100
        })),
      attractions: quotation.quotes
        .filter(quote => quote.attractions.name)
        .map(quote => ({
          cityName: quote.cityName,
          date: quote.date,
          content: quote.attractions.name
        })),
      meals: quotation.quotes.flatMap(quote => {
        const meals = [];
        if (quote.meals.breakfast) meals.push({ date: quote.date, type: 'breakfast' as const, content: 'Continental breakfast' });
        if (quote.meals.lunch) meals.push({ date: quote.date, type: 'lunch' as const, content: 'Local cuisine lunch' });
        if (quote.meals.dinner) meals.push({ date: quote.date, type: 'dinner' as const, content: 'Traditional dinner' });
        return meals;
      }),
      localGuides: quotation.quotes
        .filter(quote => quote.localGuide.salary.count > 0)
        .map(quote => ({
          date: quote.date,
          cityName: quote.cityName,
          working_hours: 8,
          languages: ['English', 'Local Language']
        })),
      services: quotation.quotes.map(quote => ({
        date: quote.date,
        cityName: quote.cityName,
        type: 'Transportation',
        time: new Date(quote.date.getTime() + 9 * 60 * 60 * 1000),
        itinerary: `City tour and transportation in ${quote.cityName}`,
        duration: `${quote.dayCount} day(s)`
      })),
      calculations
    };

    setQuotationResults(results);
    setCurrentView('quotationResults');
  };

  const handleBackToList = () => {
    setCurrentView('quotationList');
    setQuotationResults(null);
    setSelectedQuotationId(null);
  };

  const handleBackToForm = () => {
    setCurrentView('quotationForm');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          colorBgContainer: '#ffffff',
        },
        components: {
          Card: {
            borderRadiusLG: 12,
          },
          Button: {
            borderRadius: 8,
          },
          Input: {
            borderRadius: 6,
          },
        },
      }}
    >
      <div className="App">
        {currentView === 'login' && (
          <LoginPage onLogin={handleLogin} />
        )}
        
        {currentView === 'createClient' && (
          <CreateClientPage onSubmit={handleClientSubmit} />
        )}
        
        {currentView === 'quotationList' && currentClient && (
          <QuotationListPage
            client={currentClient}
            onAddNew={handleAddNewQuotation}
            onViewQuotation={handleViewQuotation}
          />
        )}
        
        {currentView === 'quotationForm' && (
          <QuotationForm onSubmit={handleQuotationSubmit} />
        )}
        
        {currentView === 'quotationResults' && quotationResults && (
          <QuotationResults
            results={quotationResults}
            onBack={selectedQuotationId ? handleBackToList : handleBackToForm}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;