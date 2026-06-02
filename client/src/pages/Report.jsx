import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, UserX, ShieldAlert, Clock, Globe } from 'lucide-react';

function Report() {
  const [reportData, setReportData] = useState({
    scammerName: '', platform: '', contact: '', details: ''
  });
  const [recentReports, setRecentReports] = useState([]);
  const [status, setStatus] = useState('');

  // 1. Fetch the latest reports from the database
  const fetchRecentReports = async () => {
    try {
      // Create this route in Flask to fetch from the 'reports' collection
      const response = await axios.get('http://localhost:5000/reports');
      setRecentReports(response.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchRecentReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      await axios.post('http://localhost:5000/report', reportData);
      setStatus('Success! Your report has been added to the blacklist.');
      setReportData({ scammerName: '', platform: '', contact: '', details: '' });
      fetchRecentReports(); // Refresh the list after submitting
    } catch (err) {
      setStatus('Failed to submit. Is the server running?');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: THE FORM */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <UserX className="text-red-600 mb-4" size={48} />
            <h1 className="text-4xl font-black text-gray-900 mb-2">Report a <span className="text-red-600">Scammer</span></h1>
            <p className="text-gray-500 text-lg">Your report helps our AI flag these scammers for the entire community.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 tracking-widest uppercase">Scammer Name / Alias</label>
                <input 
                  type="text" required value={reportData.scammerName}
                  onChange={(e) => setReportData({...reportData, scammerName: e.target.value})}
                  placeholder="e.g. HR Priya, Aman Tech Solutions"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-2 tracking-widest uppercase">Platform Used</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none cursor-pointer"
                    value={reportData.platform}
                    onChange={(e) => setReportData({...reportData, platform: e.target.value})}
                  >
                    <option value="">Select Platform</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Telegram">Telegram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Internshala">Internshala</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-2 tracking-widest uppercase">Contact Info</label>
                  <input 
                    type="text" required value={reportData.contact}
                    onChange={(e) => setReportData({...reportData, contact: e.target.value})}
                    placeholder="Phone or Email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 tracking-widest uppercase">Incident Details</label>
                <textarea 
                  rows="4" required value={reportData.details}
                  onChange={(e) => setReportData({...reportData, details: e.target.value})}
                  placeholder="What was the scam pattern? Did they ask for money?"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <button className="bg-red-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                <Send size={20} /> Blacklist This Scammer
              </button>
            </div>
          </form>
          {status && <div className={`mt-6 p-4 rounded-xl text-center font-bold ${status.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status}</div>}
        </div>

        {/* RIGHT COLUMN: RECENT BLACKLIST TICKER */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-2xl sticky top-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldAlert className="text-red-500" /> Recent Blacklist
            </h3>
            
            <div className="space-y-6">
              {recentReports.length > 0 ? (
                recentReports.map((report, index) => (
                  <div key={index} className="border-l-2 border-red-500 pl-4 py-1">
                    <p className="font-bold text-red-400">{report.scammerName}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Globe size={12} /> {report.platform} • <Clock size={12} /> Just now
                    </p>
                    <p className="text-sm mt-2 text-gray-300 line-clamp-2">"{report.details}"</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No reports yet. The community is safe.</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800 text-center">
              <p className="text-xs text-gray-500">All reports are verified by our ML model before final blacklisting.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Report;