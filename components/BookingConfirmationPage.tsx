
import React from 'react';
import { Booking } from '../types';
import { CheckCircleIcon } from './icons';

interface BookingConfirmationPageProps {
  booking: Booking;
  onGoHome: () => void;
}

const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({ booking, onGoHome }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div>
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Booking Confirmed!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your car is reserved. A confirmation email has been sent.
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-left space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-500">Booking Reference:</span>
            <span className="font-mono text-lg font-bold text-trust-blue">{booking.reference}</span>
          </div>
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="font-semibold text-gray-500">Driver:</span>
            <span className="font-medium text-gray-800">{booking.driver.first_name} {booking.driver.last_name}</span>
          </div>
           <div className="border-t pt-3 flex justify-between items-center">
            <span className="font-semibold text-gray-500">Total Paid:</span>
            <span className="font-bold text-gray-900 text-xl">LKR {booking.pricing.total.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <button
            onClick={onGoHome}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-trust-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
