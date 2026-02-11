import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    company: '',
    description: '',
    stipend: '',
    url: ''
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    try {
      // Connect to your Python Backend
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Is the Python backend running?');
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine color based on prediction
  const getStatusColor = (prediction) => {
    if (prediction === 'Genuine') return 'var(--success)';
    if (prediction === 'Suspicious') return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🛡️ InternShield AI</h1>
        <p>Intelligent Fraud Internship Detection System</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>
            <input 
              name="company" 
              placeholder="e.g. Tech Solutions Pvt Ltd" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Website URL</label>
            <input 
              name="url" 
              placeholder="e.g. https://example.com" 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Stipend Details</label>
            <input 
              name="stipend" 
              placeholder="e.g. ₹10,000 / Unpaid" 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>Internship Description</label>
            <textarea 
              name="description" 
              placeholder="Paste the full job description here..." 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Internship'}
          </button>
        </form>

        {error && <p style={{color: 'red', marginTop: '1rem'}}>{error}</p>}
      </div>

      {result && (
        <div className={`result-box ${result.prediction}`}>
          <div className="result-header">
            <span className="result-title" style={{color: getStatusColor(result.prediction)}}>
              {result.prediction.toUpperCase()}
            </span>
            <span style={{fontWeight: 'bold'}}>Risk Score: {result.risk_score}</span>
          </div>

          {/* Visual Risk Meter */}
          <div className="risk-meter-container">
            <div 
              className="risk-meter-fill" 
              style={{
                width: result.risk_score, 
                backgroundColor: getStatusColor(result.prediction)
              }}
            ></div>
          </div>

          <p><strong>Analysis:</strong> {result.reason}</p>
        </div>
      )}
    </div>
  );
}

export default App;