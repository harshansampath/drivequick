
import React, { useState } from 'react';
import { Vehicle, Booking } from '../types';
import { ArrowLeftIcon } from './icons';

interface CheckoutPageProps {
  vehicle: Vehicle;
  bookingDetails: Booking;
  onConfirmBooking: (booking: Booking) => void;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ vehicle, bookingDetails, onConfirmBooking, onBack }) => {
  const [step, setStep] = useState(1);
  const [driverInfo, setDriverInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dob: '',
    licence_number: '',
    issuing_country: 'LK',
  });
  const [extras, setExtras] = useState<{id: string, name: string, price: number}[]>([]);

  const handleDriverInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDriverInfo({ ...driverInfo, [e.target.name]: e.target.value });
  };
  
  const handleExtrasChange = (e: React.ChangeEvent<HTMLInputElement>, extra: {id: string, name: string, price: number}) => {
    if (e.target.checked) {
      setExtras(prev => [...prev, extra]);
    } else {
      setExtras(prev => prev.filter(item => item.id !== extra.id));
    }
  };
  
  const totalExtrasPrice = extras.reduce((sum, extra) => sum + extra.price, 0);
  const finalTotal = bookingDetails.pricing.base + bookingDetails.pricing.taxes + bookingDetails.pricing.fees + totalExtrasPrice;


  const handleNextStep = () => setStep(s => s + 1);
  const handlePrevStep = () => setStep(s => s - 1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBooking = {
        ...bookingDetails,
        driver: driverInfo,
        extras,
        pricing: {
            ...bookingDetails.pricing,
            extras: totalExtrasPrice,
            total: finalTotal
        }
    };
    onConfirmBooking(finalBooking);
  };
  
  const availableExtras = [
      { id: 'ins_full', name: 'Full Damage Waiver', price: 7500 },
      { id: 'gps_unit', name: 'GPS Navigation', price: 3600 },
      { id: 'child_seat', name: 'Child Seat', price: 4500 },
  ]

  const renderStep = () => {
    switch(step) {
      case 1: // Review & Add-ons
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Review Your Booking</h2>
            <div className="border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
                <p className="text-gray-600">{vehicle.group}</p>
            </div>
            <h3 className="text-xl font-semibold mb-4">Add Extras</h3>
            <div className="space-y-4">
              {availableExtras.map(extra => (
                <label key={extra.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                        <span className="font-medium text-gray-800">{extra.name}</span>
                        <p className="text-sm text-gray-500">LKR {extra.price.toLocaleString()} / day</p>
                    </div>
                    <input type="checkbox" onChange={(e) => handleExtrasChange(e, extra)} className="h-5 w-5 text-trust-blue rounded border-gray-300 focus:ring-trust-blue" />
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={handleNextStep} className="bg-trust-blue text-white font-bold py-2 px-6 rounded-lg">Next: Driver Info</button>
            </div>
          </div>
        );
      case 2: // Driver Information
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Driver Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="first_name" placeholder="First Name" onChange={handleDriverInfoChange} className="p-2 border rounded" required />
                <input name="last_name" placeholder="Last Name" onChange={handleDriverInfoChange} className="p-2 border rounded" required />
                <input name="email" type="email" placeholder="Email Address" onChange={handleDriverInfoChange} className="p-2 border rounded md:col-span-2" required />
                <input name="phone" type="tel" placeholder="Phone Number" onChange={handleDriverInfoChange} className="p-2 border rounded md:col-span-2" required />
                <input name="dob" type="date" placeholder="Date of Birth" onChange={handleDriverInfoChange} className="p-2 border rounded" required />
                <input name="licence_number" placeholder="Driver's License Number" onChange={handleDriverInfoChange} className="p-2 border rounded" required />
                <select name="issuing_country" onChange={handleDriverInfoChange} defaultValue="LK" className="p-2 border rounded md:col-span-2">
                    <option value="LK">Sri Lanka</option>
                </select>
            </div>
            <div className="mt-6 flex justify-between">
                <button onClick={handlePrevStep} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg">Back</button>
                <button onClick={handleNextStep} className="bg-trust-blue text-white font-bold py-2 px-6 rounded-lg">Next: Payment</button>
            </div>
          </div>
        );
      case 3: // Payment
        return (
            <div>
              <h2 className="text-2xl font-bold mb-4">Payment</h2>
              <p className="text-gray-600 mb-6">This is a mock payment screen. No real payment will be processed.</p>
              <div className="space-y-4">
                  <input placeholder="Card Number" className="p-2 border rounded w-full" />
                  <div className="flex space-x-4">
                      <input placeholder="MM / YY" className="p-2 border rounded w-1/2" />
                      <input placeholder="CVC" className="p-2 border rounded w-1/2" />
                  </div>
                  <input placeholder="Name on Card" className="p-2 border rounded w-full" />
              </div>
              <div className="mt-6 flex justify-between">
                  <button onClick={handlePrevStep} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg">Back</button>
                  <button onClick={handleSubmit} className="bg-speed-orange text-white font-bold py-3 px-8 rounded-lg text-lg">Confirm Booking</button>
              </div>
            </div>
        );
      default: return null;
    }
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-trust-blue font-semibold mb-6 hover:underline">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Vehicle Details
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
            {/* Stepper */}
            <div className="mb-8">
              <ol className="flex items-center w-full">
                  <li className={`flex w-full items-center ${step > 1 ? 'text-blue-600' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${step > 1 ? 'after:border-blue-600' : 'after:border-gray-200'}`}>
                      <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${step >= 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>1</span>
                  </li>
                  <li className={`flex w-full items-center ${step > 2 ? 'text-blue-600' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${step > 2 ? 'after:border-blue-600' : 'after:border-gray-200'}`}>
                      <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${step >= 2 ? 'bg-blue-100' : 'bg-gray-100'}`}>2</span>
                  </li>
                  <li className="flex items-center w-auto">
                       <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${step >= 3 ? 'bg-blue-100' : 'bg-gray-100'}`}>3</span>
                  </li>
              </ol>
            </div>
            {renderStep()}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-bold border-b pb-4">Price Summary</h3>
              <div className="space-y-2 mt-4">
                  <div className="flex justify-between"><span className="text-gray-600">Base Rate</span><span>LKR {bookingDetails.pricing.base.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Taxes</span><span>LKR {bookingDetails.pricing.taxes.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Fees</span><span>LKR {bookingDetails.pricing.fees.toLocaleString()}</span></div>
                  {extras.length > 0 && <div className="flex justify-between"><span className="text-gray-600">Extras</span><span>LKR {totalExtrasPrice.toLocaleString()}</span></div>}
              </div>
              <div className="flex justify-between font-bold text-xl mt-4 border-t pt-4">
                <span>Total</span>
                <span>LKR {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
