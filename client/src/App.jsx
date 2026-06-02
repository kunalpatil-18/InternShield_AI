import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ScamResources from './pages/ScamResources'; 
import Report from './pages/Report';
import AnalyzeJob from './pages/AnalyzeJob'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Route for the Analyze Job Page */}
            <Route path="/analyze" element={<AnalyzeJob />} />
            
            {/* Fixed the name here to match the import above */}
            <Route path="/resources" element={<ScamResources />} />
            
            {/* Route for the Report Page */}
            <Route path="/report" element={<Report />} />
            
          </Routes>
        </main>
        
        {/* You might want to add a Footer component here later */}
      </div>
    </Router>
  );
}

export default App;