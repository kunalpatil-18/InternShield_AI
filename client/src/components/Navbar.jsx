import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-teal-700 text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">🛡️</span> InternShield AI
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-teal-700 font-semibold transition-colors">HOME</Link>
            <Link to="/analyze" className="text-gray-600 hover:text-teal-700 font-semibold transition-colors">ANALYZE JOB</Link>
            <Link to="/resources" className="text-gray-600 hover:text-teal-700 font-semibold transition-colors">SCAM RESOURCES</Link>
            <Link to="/report" className="text-gray-600 hover:text-teal-700 font-semibold transition-colors">REPORT</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none text-3xl">
              ☰
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
      <div className="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 shadow-lg">
        <div className="px-2 pt-2 pb-4 space-y-2 flex flex-col items-center">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-teal-700 font-semibold">HOME</Link>
          
          {/* Change #analyze to /analyze */}
          <Link to="/analyze" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-teal-700 font-semibold">ANALYZE JOB</Link>
          
          {/* Update /resources and add /report to match your App.jsx routes */}
          <Link to="/resources" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-teal-700 font-semibold">SCAM RESOURCES</Link>
          <Link to="/report" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:text-teal-700 font-semibold">REPORT</Link>
        </div>
      </div>
      )}
    </nav>
  );
}

export default Navbar;