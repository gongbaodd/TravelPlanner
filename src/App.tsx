import React, { useState } from 'react';
import QuotationForm from './components/QuotationForm';
import QuotationResults from './components/QuotationResults';
import { IQuotation, IQuotationResults } from './types';
import { calculateQuotationTotals } from './utils/calculations';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [quotationResults, setQuotationResults] = useState<IQuotationResults | null>(null);

  const handleQuotationSubmit = (quotation: IQuotation) => {
    // Generate mock results based on the quotation data
    const calculations = calculateQuotationTotals(quotation);
    
    const mockResults: IQuotationResults = {
      client: {
        companyName: 'Sample Travel Company',
        address: '123 Business St, City, Country',
        tel: '+1-234-567-8900',
        contactName: 'John Smith',
        email: 'john.smith@travelcompany.com'
      },
      greatLineInfo: {
        contactName: quotation.operator,
        department: 'Travel Operations',
        tel: '+1-555-0123',
        email: 'operations@greatline.com'
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
        validateDate: new Date(quotation.date.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days later
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
          reviews: Math.floor(Math.random() * 1000) + 100 // Mock reviews
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
        time: new Date(quote.date.getTime() + 9 * 60 * 60 * 1000), // 9 AM
        itinerary: `City tour and transportation in ${quote.cityName}`,
        duration: `${quote.dayCount} day(s)`
      })),
      calculations
    };

    setQuotationResults(mockResults);
    setCurrentView('results');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  return (
    <div className="App">
      {currentView === 'form' ? (
        <QuotationForm onSubmit={handleQuotationSubmit} />
      ) : (
        quotationResults && (
          <QuotationResults results={quotationResults} onBack={handleBackToForm} />
        )
      )}
    </div>
  );
}

export default App;