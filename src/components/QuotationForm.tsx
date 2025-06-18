import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Save } from 'lucide-react';
import { IQuotation, IQuote, ILocalGuide, IPrice, IppPrice, IGroupPrice, IMeal, IAttraction } from '../types';

interface QuotationFormProps {
  onSubmit: (quotation: IQuotation) => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ onSubmit }) => {
  const [quotation, setQuotation] = useState<IQuotation>({
    allNum: 0,
    leadNum: 0,
    carType: '',
    singleRoomFactor: 1,
    groupName: '',
    groupNumber: '',
    operator: '',
    date: new Date(),
    quotes: [],
    details: {
      transport: '',
      hotel: '',
      meal: '',
      attraction: '',
      guide: '',
      extra: ''
    }
  });

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
    setQuotation(prev => ({
      ...prev,
      quotes: [...prev.quotes, createEmptyQuote()]
    }));
  };

  const removeQuote = (index: number) => {
    setQuotation(prev => ({
      ...prev,
      quotes: prev.quotes.filter((_, i) => i !== index)
    }));
  };

  const updateQuote = (index: number, field: string, value: any) => {
    setQuotation(prev => ({
      ...prev,
      quotes: prev.quotes.map((quote, i) => 
        i === index ? { ...quote, [field]: value } : quote
      )
    }));
  };

  const updateNestedQuoteField = (index: number, path: string[], value: any) => {
    setQuotation(prev => ({
      ...prev,
      quotes: prev.quotes.map((quote, i) => {
        if (i === index) {
          const updatedQuote = { ...quote };
          let current: any = updatedQuote;
          
          for (let j = 0; j < path.length - 1; j++) {
            current = current[path[j]];
          }
          current[path[path.length - 1]] = value;
          
          return updatedQuote;
        }
        return quote;
      })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(quotation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Travel Quotation System</h1>
            <p className="text-blue-100 mt-2">Create detailed travel quotations with precision</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calendar className="mr-3 text-blue-600" size={24} />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Number</label>
                  <input
                    type="number"
                    value={quotation.allNum}
                    onChange={(e) => setQuotation(prev => ({ ...prev, allNum: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lead Number</label>
                  <input
                    type="number"
                    value={quotation.leadNum}
                    onChange={(e) => setQuotation(prev => ({ ...prev, leadNum: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
                  <input
                    type="text"
                    value={quotation.carType}
                    onChange={(e) => setQuotation(prev => ({ ...prev, carType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Single Room Factor</label>
                  <input
                    type="number"
                    step="0.1"
                    value={quotation.singleRoomFactor}
                    onChange={(e) => setQuotation(prev => ({ ...prev, singleRoomFactor: parseFloat(e.target.value) || 1 }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                  <input
                    type="text"
                    value={quotation.groupName}
                    onChange={(e) => setQuotation(prev => ({ ...prev, groupName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
                  <input
                    type="text"
                    value={quotation.groupNumber}
                    onChange={(e) => setQuotation(prev => ({ ...prev, groupNumber: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operator</label>
                  <input
                    type="text"
                    value={quotation.operator}
                    onChange={(e) => setQuotation(prev => ({ ...prev, operator: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={quotation.date.toISOString().split('T')[0]}
                    onChange={(e) => setQuotation(prev => ({ ...prev, date: new Date(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Daily Quotes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Daily Quotes</h2>
                <button
                  type="button"
                  onClick={addQuote}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus size={20} className="mr-2" />
                  Add Quote
                </button>
              </div>

              {quotation.quotes.map((quote, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Day {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeQuote(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={quote.date.toISOString().split('T')[0]}
                        onChange={(e) => updateQuote(index, 'date', new Date(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Day Count</label>
                      <input
                        type="number"
                        value={quote.dayCount}
                        onChange={(e) => updateQuote(index, 'dayCount', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                      <input
                        type="text"
                        value={quote.cityName}
                        onChange={(e) => updateQuote(index, 'cityName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="City name, FLY, or EMPTY DRIVING"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transport Cost (EUR)</label>
                      <input
                        type="number"
                        value={quote.transportCost.count}
                        onChange={(e) => updateNestedQuoteField(index, ['transportCost', 'count'], parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Stars</label>
                      <select
                        value={quote.hotel.stars}
                        onChange={(e) => updateNestedQuoteField(index, ['hotel', 'stars'], parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(star => (
                          <option key={star} value={star}>{star} Star</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Reference</label>
                      <input
                        type="text"
                        value={quote.hotel.reference}
                        onChange={(e) => updateNestedQuoteField(index, ['hotel', 'reference'], e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hotel PP Price (EUR)</label>
                      <input
                        type="number"
                        value={quote.hotel.ppPrice.count}
                        onChange={(e) => updateNestedQuoteField(index, ['hotel', 'ppPrice', 'count'], parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Single Room Count</label>
                      <input
                        type="number"
                        value={quote.hotel.singleRoom.count}
                        onChange={(e) => updateNestedQuoteField(index, ['hotel', 'singleRoom', 'count'], parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Single Room PP Price (EUR)</label>
                      <input
                        type="number"
                        value={quote.hotel.singleRoom.ppPrice.count}
                        onChange={(e) => updateNestedQuoteField(index, ['hotel', 'singleRoom', 'ppPrice', 'count'], parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Meals</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                        <div key={mealType}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {mealType} Price (EUR)
                          </label>
                          <input
                            type="number"
                            value={quote.meals[mealType as keyof typeof quote.meals]?.ppPrice.count || ''}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              if (value > 0) {
                                updateNestedQuoteField(index, ['meals', mealType], {
                                  ppPrice: { count: value, currency: 'EUR', type: 'Person' }
                                });
                              } else {
                                updateNestedQuoteField(index, ['meals', mealType], null);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0 for no meal"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Additional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Attraction Name</label>
                        <input
                          type="text"
                          value={quote.attractions.name}
                          onChange={(e) => updateNestedQuoteField(index, ['attractions', 'name'], e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Attraction PP Price (EUR)</label>
                        <input
                          type="number"
                          value={quote.attractions.ppPrice.count}
                          onChange={(e) => updateNestedQuoteField(index, ['attractions', 'ppPrice', 'count'], parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Guide Price (EUR)</label>
                        <input
                          type="number"
                          value={quote.guide.count}
                          onChange={(e) => updateNestedQuoteField(index, ['guide', 'count'], parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Water PP Price (EUR)</label>
                        <input
                          type="number"
                          value={quote.water.count}
                          onChange={(e) => updateNestedQuoteField(index, ['water', 'count'], parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Extra Notes</label>
                        <textarea
                          value={quote.extra}
                          onChange={(e) => updateQuote(index, 'extra', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Local Guide</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tip Amount (EUR)</label>
                        <input
                          type="number"
                          value={quote.localGuide.tip.count}
                          onChange={(e) => updateNestedQuoteField(index, ['localGuide', 'tip', 'count'], parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tip Type</label>
                        <select
                          value={quote.localGuide.tip.type}
                          onChange={(e) => updateNestedQuoteField(index, ['localGuide', 'tip', 'type'], e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Person">Person</option>
                          <option value="Group">Group</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary (EUR)</label>
                        <input
                          type="number"
                          value={quote.localGuide.salary.count}
                          onChange={(e) => updateNestedQuoteField(index, ['localGuide', 'salary', 'count'], parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation (EUR)</label>
                        <input
                          type="number"
                          value={quote.localGuide.accomadation.count}
                          onChange={(e) => updateNestedQuoteField(index, ['localGuide', 'accomadation', 'count'], parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meal (EUR)</label>
                        <input
                          type="number"
                          value={quote.localGuide.meal.count}
                          onChange={(e) => updateNestedQuoteField(index, ['localGuide', 'meal', 'count'], parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Details Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(quotation.details).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key} Details
                    </label>
                    <textarea
                      value={value}
                      onChange={(e) => setQuotation(prev => ({
                        ...prev,
                        details: { ...prev.details, [key]: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center text-lg font-semibold shadow-lg"
              >
                <Save size={24} className="mr-3" />
                Generate Quotation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuotationForm;