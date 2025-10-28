
import React, { useState, useMemo } from 'react';
import { Vehicle, SearchCriteria } from '../types';
import VehicleCard from './VehicleCard';

interface SearchResultsPageProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  searchCriteria: SearchCriteria;
  onSearchChange: () => void;
}

type SortOption = 'price_asc' | 'price_desc' | 'passengers_desc';

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ vehicles, onSelectVehicle, searchCriteria, onSearchChange }) => {
  const [sort, setSort] = useState<SortOption>('price_asc');
  const [filters, setFilters] = useState({
      vehicle_group: [] as string[],
      transmission: [] as string[],
  });

  const filteredAndSortedVehicles = useMemo(() => {
    let result = [...vehicles];
    
    // Filtering
    if (filters.vehicle_group.length > 0) {
        result = result.filter(v => filters.vehicle_group.includes(v.group));
    }
    if (filters.transmission.length > 0) {
        result = result.filter(v => filters.transmission.includes(v.transmission));
    }

    // Sorting
    result.sort((a, b) => {
      switch (sort) {
        case 'price_asc':
          return a.base_rate.amount - b.base_rate.amount;
        case 'price_desc':
          return b.base_rate.amount - a.base_rate.amount;
        case 'passengers_desc':
          return b.passengers - a.passengers;
        default:
          return 0;
      }
    });
    return result;
  }, [vehicles, sort, filters]);
  
  const handleFilterChange = (filterType: 'vehicle_group' | 'transmission', value: string) => {
      setFilters(prev => {
          const currentValues = prev[filterType];
          if (currentValues.includes(value)) {
              return { ...prev, [filterType]: currentValues.filter(item => item !== value) };
          } else {
              return { ...prev, [filterType]: [...currentValues, value] };
          }
      });
  };

  const vehicleGroups = useMemo(() => [...new Set(vehicles.map(v => v.group))], [vehicles]);
  const transmissions = useMemo(() => [...new Set(vehicles.map(v => v.transmission))], [vehicles]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div>
                <p className="text-gray-600"><span className="font-medium">{searchCriteria.pickupLocation}</span></p>
                <p className="text-sm text-gray-500">
                    {new Date(searchCriteria.pickupDateTime).toLocaleString()} - {new Date(searchCriteria.dropoffDateTime).toLocaleString()}
                </p>
            </div>
            <button onClick={onSearchChange} className="bg-trust-blue/10 text-trust-blue font-semibold py-2 px-4 rounded-md hover:bg-trust-blue/20 transition">
                Change Search
            </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Vehicle Group Filter */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Vehicle Type</h4>
                <div className="space-y-2">
                    {vehicleGroups.map(group => (
                        <label key={group} className="flex items-center">
                            <input type="checkbox" onChange={() => handleFilterChange('vehicle_group', group)} className="h-4 w-4 text-trust-blue rounded border-gray-300 focus:ring-trust-blue" />
                            <span className="ml-2 text-gray-700">{group}</span>
                        </label>
                    ))}
                </div>
              </div>
              
              <hr className="my-6" />

              {/* Transmission Filter */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Transmission</h4>
                <div className="space-y-2">
                    {transmissions.map(transmission => (
                        <label key={transmission} className="flex items-center">
                            <input type="checkbox" onChange={() => handleFilterChange('transmission', transmission)} className="h-4 w-4 text-trust-blue rounded border-gray-300 focus:ring-trust-blue" />
                            <span className="ml-2 text-gray-700">{transmission}</span>
                        </label>
                    ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{filteredAndSortedVehicles.length} vehicles available</h2>
              <div>
                <label htmlFor="sort-by" className="sr-only">Sort by</label>
                <select 
                    id="sort-by" 
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="border-gray-300 rounded-md shadow-sm focus:border-trust-blue focus:ring-trust-blue"
                >
                  <option value="price_asc">Price (low to high)</option>
                  <option value="price_desc">Price (high to low)</option>
                  <option value="passengers_desc">Passengers (most first)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredAndSortedVehicles.length > 0 ? (
                filteredAndSortedVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={() => onSelectVehicle(vehicle)} />
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <h3 className="text-xl font-semibold">No vehicles found</h3>
                    <p className="text-gray-600 mt-2">Try adjusting your filters or search criteria.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
