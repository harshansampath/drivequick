
import React, { useState } from 'react';
import { Vehicle } from '../types';
import { UsersIcon, BriefcaseIcon, ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, CheckCircleIcon } from './icons';

interface VehicleDetailsPageProps {
  vehicle: Vehicle;
  onBookNow: (vehicle: Vehicle) => void;
  onBack: () => void;
}

const VehicleDetailsPage: React.FC<VehicleDetailsPageProps> = ({ vehicle, onBookNow, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + vehicle.images.length) % vehicle.images.length);
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-trust-blue font-semibold mb-6 hover:underline">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Results
      </button>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative">
              <img src={vehicle.images[currentImageIndex]} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-64 md:h-96 object-cover" />
              {vehicle.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 p-6 md:p-8 flex flex-col">
            <p className="text-sm font-semibold text-trust-blue uppercase">{vehicle.group}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">{vehicle.make} {vehicle.model}</h1>
            <p className="text-gray-500 text-lg mt-1">{vehicle.year}</p>

            <div className="mt-6 flex items-center space-x-6 text-gray-700">
              <div className="flex items-center space-x-2">
                <UsersIcon className="w-6 h-6" />
                <span className="text-lg">{vehicle.passengers} Passengers</span>
              </div>
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="w-6 h-6" />
                <span className="text-lg">{vehicle.luggage}</span>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {vehicle.features.map(feature => (
                        <li key={feature} className="flex items-center text-gray-600">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mt-auto pt-8">
              <div className="text-right mb-4">
                <p className="text-gray-500">Price per day</p>
                <p className="text-4xl font-extrabold text-gray-900">
                    <span className="text-2xl align-top">LKR </span>{vehicle.base_rate.amount.toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => onBookNow(vehicle)}
                className="w-full bg-speed-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-xl">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
