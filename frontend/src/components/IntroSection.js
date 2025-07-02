import React from 'react';
import { Card } from 'react-bootstrap';

function IntroSection() {
  return (
    <Card className="mb-4 p-3 shadow-sm border-0">
      <h2 className="text-primary">Welcome to FitInSight Risk Predictor</h2>
      <p>
        This intelligent tool uses <strong>Machine Learning models</strong> to assess your health risks related to
        <strong> Heart Disease, Obesity,</strong> and <strong>Diabetes</strong>.
        <br />
        Simply select your desired prediction type below and fill out the quick form to get an instant risk assessment in percentage.
      </p>
    </Card>
  );
}

export default IntroSection;
