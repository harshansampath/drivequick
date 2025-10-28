
import React, { useState, useCallback } from 'react';
import { AppState, View, Vehicle, SearchCriteria, Booking } from './types';
import { MOCK_VEHICLES } from './data/mockData';
import HomePage from './components/HomePage';
import SearchResultsPage from './components/SearchResultsPage';
import VehicleDetailsPage from './components/VehicleDetailsPage';
import CheckoutPage from './components/CheckoutPage';
import BookingConfirmationPage from './components/BookingConfirmationPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    view: View.Home,
    searchCriteria: null,
    searchResults: [],
    selectedVehicle: null,
    bookingDetails: null,
  });

  const navigateTo = (view: View) => {
    setAppState(prev => ({ ...prev, view }));
    window.scrollTo(0, 0);
  };

  const handleSearch = useCallback((criteria: SearchCriteria) => {
    // Simulate API call and filtering
    const results = MOCK_VEHICLES.filter(vehicle => {
        // This is a simplified filter logic. A real app would have more complex checks.
        return vehicle.passengers >= (criteria.passengers || 1);
    });
    setAppState(prev => ({
      ...prev,
      view: View.Results,
      searchCriteria: criteria,
      searchResults: results,
    }));
    window.scrollTo(0, 0);
  }, []);

  const handleSelectVehicle = useCallback((vehicle: Vehicle) => {
    setAppState(prev => ({
      ...prev,
      view: View.Details,
      selectedVehicle: vehicle,
    }));
     window.scrollTo(0, 0);
  }, []);

  const handleStartBooking = useCallback((vehicle: Vehicle) => {
    const newBooking: Partial<Booking> = {
      vehicle_id: vehicle.id,
      pricing: {
        base: vehicle.base_rate.amount * 4, // Assuming a 4 day rental for mock pricing
        taxes: vehicle.base_rate.amount * 4 * 0.15, // 15% tax
        fees: 5000, // Standard fees in LKR
        extras: 0,
        total: (vehicle.base_rate.amount * 4) + (vehicle.base_rate.amount * 4 * 0.15) + 5000,
      }
    };
    setAppState(prev => ({
      ...prev,
      view: View.Checkout,
      bookingDetails: newBooking as Booking,
    }));
    window.scrollTo(0, 0);
  }, []);

  const handleConfirmBooking = useCallback((booking: Booking) => {
    // FIX: Explicitly type `finalBooking` as `Booking` to ensure its properties,
    // especially `status`, conform to the `Booking` interface and prevent type widening.
    const finalBooking: Booking = {
      ...booking,
      id: `bk_${Math.random().toString(36).substr(2, 9)}`,
      reference: `DQ-${new Date().getFullYear()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      status: 'confirmed',
    };
    setAppState(prev => ({
      ...prev,
      view: View.Confirmation,
      bookingDetails: finalBooking,
    }));
    window.scrollTo(0, 0);
  }, []);

  const handleGoHome = useCallback(() => {
    setAppState({
      view: View.Home,
      searchCriteria: null,
      searchResults: [],
      selectedVehicle: null,
      bookingDetails: null,
    });
    window.scrollTo(0, 0);
  }, []);


  const renderView = () => {
    switch (appState.view) {
      case View.Home:
        return <HomePage onSearch={handleSearch} />;
      case View.Results:
        return <SearchResultsPage 
                  vehicles={appState.searchResults} 
                  onSelectVehicle={handleSelectVehicle}
                  searchCriteria={appState.searchCriteria!}
                  onSearchChange={() => navigateTo(View.Home)} />;
      case View.Details:
        return <VehicleDetailsPage 
                  vehicle={appState.selectedVehicle!} 
                  onBookNow={handleStartBooking}
                  onBack={() => navigateTo(View.Results)} />;
      case View.Checkout:
        return <CheckoutPage 
                  vehicle={appState.selectedVehicle!}
                  bookingDetails={appState.bookingDetails!}
                  onConfirmBooking={handleConfirmBooking}
                  onBack={() => navigateTo(View.Details)} />;
      case View.Confirmation:
        return <BookingConfirmationPage 
                  booking={appState.bookingDetails!} 
                  onGoHome={handleGoHome} />;
      default:
        return <HomePage onSearch={handleSearch} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <Header onLogoClick={handleGoHome} />
        <main className="pt-16">
            {renderView()}
        </main>
        <Footer />
    </div>
  );
};

export default App;
