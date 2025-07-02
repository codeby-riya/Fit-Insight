import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#002D62', 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4" style={navStyle}>
      <Link className="navbar-brand" to="/">FitInsight <span style={{ fontSize: '1.8rem' }}>🩺</span> </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/risk">Risk Predictor</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
