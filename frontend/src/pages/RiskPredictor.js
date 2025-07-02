import React from 'react';
import IntroSection from '../components/IntroSection';
import RiskSelector from '../components/RiskSelector';

function RiskPredictor() {
  return (
    <div className="container mt-4">
      <IntroSection />
      <RiskSelector />
    </div>
  );
}

export default RiskPredictor;

