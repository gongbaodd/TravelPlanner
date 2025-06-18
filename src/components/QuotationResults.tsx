import React from 'react';
import { ArrowLeft, FileText, Users, MapPin, Calendar, Euro, Hotel, Car, Utensils, Camera, User } from 'lucide-react';
import { IQuotationResults } from '../types';

interface QuotationResultsProps {
  results: IQuotationResults;
  onBack: () => void;
}

const QuotationResults: React.FC<QuotationResultsProps> = ({ results, onBack }) => {
  const formatCurrency = (amount: number) => `€${amount.toLocaleString()}`;
  const formatDate = (date: Date) => date.toLocaleDateString('en-EU');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Quotation Results</h1>
                <p className="text-green-100 mt-2">Complete travel quotation breakdown</p>
              </div>
              <button
                onClick={onBack}
                className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Form
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Cost</p>
                    <p className="text-2xl font-bold">{formatCurrency(results.calculations.totalSum)}</p>
                  </div>
                  <Euro size={32} className="text-blue-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Group Size</p>
                    <p className="text-2xl font-bold">{results.groupInfo.name}</p>
                  </div>
                  <Users size={32} className="text-green-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Duration</p>
                    <p className="text-2xl font-bold">
                      {Math.ceil((results.groupInfo.endDate.getTime() - results.groupInfo.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                  <Calendar size={32} className="text-purple-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Quote Date</p>
                    <p className="text-2xl font-bold">{formatDate(results.groupQuote.quoteDate)}</p>
                  </div>
                  <FileText size={32} className="text-orange-200" />
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="mr-3 text-blue-600" size={24} />
                  Client Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-medium">{results.client.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{results.client.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{results.client.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{results.client.tel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium">{results.client.address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="mr-3 text-green-600" size={24} />
                  Great Line Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{results.greatLineInfo.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{results.greatLineInfo.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{results.greatLineInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{results.greatLineInfo.tel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Euro className="mr-3 text-blue-600" size={28} />
                Cost Breakdown
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Hotel size={20} className="text-blue-600 mr-2" />
                        <span className="text-gray-700">Hotels</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.calculations.hotelSum)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Car size={20} className="text-green-600 mr-2" />
                        <span className="text-gray-700">Transport</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.calculations.transportSum)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Utensils size={20} className="text-orange-600 mr-2" />
                        <span className="text-gray-700">Meals</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.calculations.mealSum)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Camera size={20} className="text-purple-600 mr-2" />
                        <span className="text-gray-700">Attractions</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.calculations.attractionSum)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User size={20} className="text-indigo-600 mr-2" />
                        <span className="text-gray-700">Guides</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.calculations.guideSum)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin size={20} className="text-red-600 mr-2" />
                        <span className="text-gray-700">Local Guides</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.calculations.localGuideSum)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Cost:</span>
                    <span className="text-green-600">{formatCurrency(results.calculations.totalSum)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotels Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Hotel className="mr-3 text-blue-600" size={28} />
                Hotels
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Check-in Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hotel</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nights</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Reviews</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.hotels.map((hotel, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{formatDate(hotel.checkInDate)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{hotel.cityName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{hotel.referenceHotel}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{hotel.nights}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{hotel.reviews}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Attractions Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Camera className="mr-3 text-purple-600" size={28} />
                Attractions
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Content</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.attractions.map((attraction, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{formatDate(attraction.date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{attraction.cityName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{attraction.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Meals Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Utensils className="mr-3 text-orange-600" size={28} />
                Meals
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Content</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.meals.map((meal, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{formatDate(meal.date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 capitalize">{meal.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{meal.content || 'Not included'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Local Guides Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <User className="mr-3 text-indigo-600" size={28} />
                Local Guides
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Working Hours</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Languages</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.localGuides.map((guide, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{formatDate(guide.date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{guide.cityName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{guide.working_hours}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{guide.languages.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Services Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <MapPin className="mr-3 text-red-600" size={28} />
                Services
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Itinerary</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.services.map((service, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{formatDate(service.date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{service.cityName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{service.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{service.time.toLocaleTimeString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{service.itinerary}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{service.duration || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Offer Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <FileText className="mr-3 text-green-600" size={28} />
                Offer Details
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(results.offer).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2 capitalize">
                        {key.replace('_', ' ')}
                      </h3>
                      <p className="text-gray-600 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationResults;