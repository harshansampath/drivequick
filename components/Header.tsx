
import React from 'react';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button onClick={onLogoClick} className="flex items-center space-x-2 text-2xl font-bold text-trust-blue">
                {/* A simple SVG logo */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 8V5C14 4.44772 13.5523 4 13 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H13C13.5523 20 14 19.5523 14 19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12H20L17 9M20 12L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>DriveQuick</span>
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-trust-blue transition duration-150">Manage Booking</a>
            <a href="#" className="text-gray-600 hover:text-trust-blue transition duration-150">FAQ</a>
            <a href="#" className="text-gray-600 hover:text-trust-blue transition duration-150">Customer Support</a>
            <a href="#" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition">Sign In</a>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
