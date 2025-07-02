import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import About from './pages/About';
import RiskPredictor from './pages/RiskPredictor';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RiskPredictor />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/risk" element={<RiskPredictor />} />

      </Routes>
    </Router>
  );
}

export default App;
