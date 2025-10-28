
export enum View {
  Home = 'HOME',
  Results = 'RESULTS',
  Details = 'DETAILS',
  Checkout = 'CHECKOUT',
  Confirmation = 'CONFIRMATION',
  Manage = 'MANAGE',
}

export interface Vehicle {
  id: string;
  group: string;
  make: string;
  model: string;
  year: number;
  transmission: 'Automatic' | 'Manual';
  fuel_type: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  passengers: number;
  luggage: string;
  images: string[];
  features: string[];
  mileage_policy: string;
  base_rate: {
    amount: number;
    currency: string;
  };
}

export interface SearchCriteria {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDateTime: string;
  dropoffDateTime: string;
  driverAge: number;
  passengers: number | null;
}

export interface Booking {
  id: string;
  reference: string;
  vehicle_id: string;
  pickup: { location_id: string; datetime: string };
  dropoff: { location_id: string; datetime: string };
  driver: {
    first_name: string;
    last_name: string;
    dob: string;
    licence_number: string;
    issuing_country: string;
    phone: string;
    email: string;
  };
  extras: { id: string; name: string; price: number }[];
  pricing: {
    base: number;
    taxes: number;
    fees: number;
    extras: number;
    total: number;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface AppState {
    view: View;
    searchCriteria: SearchCriteria | null;
    searchResults: Vehicle[];
    selectedVehicle: Vehicle | null;
    bookingDetails: Booking | null;
}
