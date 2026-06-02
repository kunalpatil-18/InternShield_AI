import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnalyzeJob() {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  // 1. Fetch History from Backend on Component Mount
  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/history');
      setHistory(response.data);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Could not load history. Is the backend running?");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => {
    if (filter === 'All') return true;
    return item.prediction === filter;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HISTORY & FILTER SECTION --- */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Community Scans</h2>
              <p className="text-gray-500 text-lg">
                Total verified by InternShield: <span className="text-teal-600 font-bold">{history.length}</span>
              </p>
            </div>
            
            {/* Filter Toggle */}
            <div className="flex bg-gray-200 p-1 rounded-xl shadow-inner">
              {['All', 'Genuine', 'Suspicious', 'Fraudulent'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    filter === type 
                      ? 'bg-white text-teal-700 shadow-md transform scale-105' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center font-medium border border-red-100">
              {error}
            </div>
          )}

          {/* Results List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-6 rounded-xl shadow-sm border-l-8 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all hover:shadow-md hover:translate-x-1"
                  style={{ 
                    borderColor: item.prediction === 'Genuine' ? '#10b981' 
                               : item.prediction === 'Suspicious' ? '#f59e0b' 
                               : '#ef4444' 
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-xl text-gray-800">{item.title}</h4>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        item.prediction === 'Genuine' ? 'bg-green-100 text-green-700' 
                        : item.prediction === 'Suspicious' ? 'bg-amber-100 text-amber-700' 
                        : 'bg-red-100 text-red-700'
                      }`}>
                        {item.prediction}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium">{item.company}</p>
                    <p className="text-gray-400 text-xs mt-2 italic line-clamp-1">
                      "{item.reason.substring(0, 100)}..."
                    </p>
                  </div>
                  
                  <div className="text-left md:text-right flex flex-col justify-center border-t md:border-t-0 pt-4 md:pt-0">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">Risk Score</p>
                    <p className={`text-3xl font-black ${
                      item.prediction === 'Genuine' ? 'text-green-600' 
                      : item.prediction === 'Suspicious' ? 'text-amber-500' 
                      : 'text-red-600'
                    }`}>
                      {item.risk_score}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-lg italic">No community scans found for "{filter}".</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AnalyzeJob;