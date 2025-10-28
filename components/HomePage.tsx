
import React, { useState } from 'react';
import { SearchCriteria } from '../types';
import { CalendarIcon, LocationMarkerIcon } from './icons';

interface HomePageProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const [pickupLocation, setPickupLocation] = useState('Colombo, Sri Lanka');
  const [dropoffLocation, setDropoffLocation] = useState('Colombo, Sri Lanka');
  const [pickupDateTime, setPickupDateTime] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16));
  const [dropoffDateTime, setDropoffDateTime] = useState(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16));
  const [driverAge, setDriverAge] = useState(25);
  const [sameDropoff, setSameDropoff] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      pickupLocation,
      dropoffLocation: sameDropoff ? pickupLocation : dropoffLocation,
      pickupDateTime,
      dropoffDateTime,
      driverAge,
      passengers: null
    });
  };

  return (
    <div>
      <div className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/car-road/1920/1080)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
                Find your drive. <br /> Fast and easy car rentals.
            </h1>
            <p className="text-lg md:text-xl text-white mt-4 max-w-xl">
                Transparent pricing. No hidden fees. Ever.
            </p>
        </div>
      </div>
      <div className="transform -translate-y-1/2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="lg:col-span-2">
                  <label htmlFor="pickup-location" className="block text-sm font-medium text-gray-700 mb-1">Pick-up Location</label>
                  <div className="relative">
                    <LocationMarkerIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="pickup-location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-trust-blue focus:border-trust-blue"
                      placeholder="City, airport, or address"
                    />
                  </div>
                   <div className="mt-2">
                      <input 
                        type="checkbox" 
                        id="same-dropoff" 
                        checked={sameDropoff}
                        onChange={() => setSameDropoff(!sameDropoff)}
                        className="h-4 w-4 text-trust-blue focus:ring-trust-blue border-gray-300 rounded"
                      />
                      <label htmlFor="same-dropoff" className="ml-2 text-sm text-gray-600">Drop-off at same location</label>
                   </div>
                   {!sameDropoff && (
                       <div className="mt-4">
                           <label htmlFor="dropoff-location" className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
                           <div className="relative">
                               <LocationMarkerIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                               <input
                                   type="text"
                                   id="dropoff-location"
                                   value={dropoffLocation}
                                   onChange={(e) => setDropoffLocation(e.target.value)}
                                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-trust-blue focus:border-trust-blue"
                                   placeholder="City, airport, or address"
                               />
                           </div>
                       </div>
                   )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
                  <div>
                    <label htmlFor="pickup-datetime" className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date & Time</label>
                    <div className="relative">
                      <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="datetime-local"
                        id="pickup-datetime"
                        value={pickupDateTime}
                        onChange={(e) => setPickupDateTime(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-trust-blue focus:border-trust-blue"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="dropoff-datetime" className="block text-sm font-medium text-gray-700 mb-1">Drop-off Date & Time</label>
                    <div className="relative">
                      <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="datetime-local"
                        id="dropoff-datetime"
                        value={dropoffDateTime}
                        onChange={(e) => setDropoffDateTime(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-trust-blue focus:border-trust-blue"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button type="submit" className="w-full md:w-auto bg-speed-orange hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-lg transition duration-300 ease-in-out text-lg">
                  Search
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
