
import React from 'react';
import { Vehicle } from '../types';
import { UsersIcon, BriefcaseIcon } from './icons';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row transition-shadow duration-300 hover:shadow-xl">
      <div className="md:w-1/3 lg:w-2/5">
        <img src={vehicle.images[0]} alt={`${vehicle.make} ${vehicle.model}`} className="object-cover h-48 w-full md:h-full" />
      </div>
      <div className="p-6 flex flex-col justify-between md:w-2/3 lg:w-3/5">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-trust-blue uppercase">{vehicle.group}</p>
              <h3 className="text-2xl font-bold text-gray-800">{vehicle.make} {vehicle.model}</h3>
              <p className="text-gray-500">{vehicle.year}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                <span className="text-xl align-top">LKR </span>{vehicle.base_rate.amount.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">per day</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <UsersIcon className="w-5 h-5" />
              <span>{vehicle.passengers} Passengers</span>
            </div>
            <div className="flex items-center space-x-1">
                <BriefcaseIcon className="w-5 h-5" />
                <span>{vehicle.luggage} Luggage</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* Simple Transmission Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
              <span>{vehicle.transmission}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onSelect} 
            className="bg-speed-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
