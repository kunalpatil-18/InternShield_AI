import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    stipend: '',
    requirements: '',
    description: '',
    has_company_logo: false,
    telecommuting: false,
    has_questions: false
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Is the Python backend running?');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (prediction) => {
    if (prediction === 'Genuine') return '#10b981'; // Tailwind emerald-500
    if (prediction === 'Suspicious') return '#f59e0b'; // Tailwind amber-500
    return '#ef4444'; // Tailwind red-500
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen pb-12">
      
      {/* Original Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 to-teal-600 text-white py-20 px-8 flex justify-center shadow-inner">
        <div className="max-w-6xl w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide drop-shadow-md">
            Protect Your Career from Scam Internships
          </h1>
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed opacity-90 mb-8">
            Paste the details of any internship offer below. Our Machine Learning model analyzes the job description, requirements, and stipend details to detect red flags instantly.
          </p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-6xl mx-auto -mt-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-400">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🚩 Spot Red Flags</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our ML model detects common scam language, such as asking for upfront payments or promising unrealistic returns for basic tasks.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-teal-500">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🔍 Verify Details</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We cross-reference the provided requirements and descriptions to ensure they match legitimate industry standards.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-emerald-400">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🤖 ML-Powered</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Trained on thousands of real and fake internship postings to give you an accurate, real-time risk assessment score.
          </p>
        </div>
      </section>

      {/* Analyzer Form Section */}
      <section id="analyze" className="max-w-4xl mx-auto mt-16 px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="mb-8 border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-800">Analyze an Internship</h2>
            <p className="text-gray-500 mt-2">Fill in the details below to generate a fraud risk report.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Compulsory Text Fields First */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Job Title *</label>
                <input 
                  name="title" 
                  placeholder="e.g. Data Science Intern" 
                  onChange={handleChange} 
                  required 
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Company Name *</label>
                <input 
                  name="company" 
                  placeholder="e.g. Tech Solutions Pvt Ltd" 
                  onChange={handleChange} 
                  required 
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Stipend Details *</label>
              <input 
                name="stipend" 
                placeholder="e.g. ₹10,000 / Unpaid / Performance based" 
                onChange={handleChange} 
                required
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Job Requirements *</label>
              <textarea 
                name="requirements" 
                rows="3"
                placeholder="Paste the required skills, education, and qualifications..." 
                onChange={handleChange} 
                required 
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Internship Description *</label>
              <textarea 
                name="description" 
                rows="4"
                placeholder="Paste the daily responsibilities and general overview here..." 
                onChange={handleChange} 
                required 
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* 2. Compulsory Additional Indicators (Updated to Green/Teal theme) */}
            <div className="bg-teal-50 p-6 rounded-md border border-teal-100 mt-4">
              <label className="text-sm font-bold text-teal-900 block mb-3">Important Verification Details *</label>
              <p className="text-xs text-teal-700 mb-4">You must answer these to ensure an accurate prediction.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-teal-800 mb-1">Has Company Logo?</label>
                  <select name="has_company_logo" onChange={handleChange} required className="p-2 border border-teal-300 rounded-md outline-none focus:ring-2 focus:ring-teal-500 bg-white text-teal-900">
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-teal-800 mb-1">Is it Remote/Work From Home?</label>
                  <select name="telecommuting" onChange={handleChange} required className="p-2 border border-teal-300 rounded-md outline-none focus:ring-2 focus:ring-teal-500 bg-white text-teal-900">
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-teal-800 mb-1">Has Screening Questions?</label>
                  <select name="has_questions" onChange={handleChange} required className="p-2 border border-teal-300 rounded-md outline-none focus:ring-2 focus:ring-teal-500 bg-white text-teal-900">
                    <option value="">Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-md font-bold text-white transition-all ${
                loading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? 'Analyzing Application...' : 'Analyze Internship Risk'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-lg border-2" style={{borderColor: getStatusColor(result.prediction)}}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-bold">ML Verdict</h3>
                <span className="text-3xl font-black uppercase" style={{color: getStatusColor(result.prediction)}}>
                  {result.prediction}
                </span>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-bold">Risk Score</h3>
                <span className="text-2xl font-bold text-gray-800">{result.risk_score}</span>
              </div>
            </div>

            {/* Visual Risk Meter */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
              <div 
                className="h-4 rounded-full transition-all duration-1000 ease-out" 
                style={{
                  width: result.risk_score, 
                  backgroundColor: getStatusColor(result.prediction)
                }}
              ></div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2">Analysis Details:</h4>
              <p className="text-gray-600 leading-relaxed">{result.reason}</p>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}

export default Home;