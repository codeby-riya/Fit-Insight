
import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4" style={{ color: '#002D62', fontWeight: 'bold' }}>
          Welcome to FitInsight
        </h1>
        <p className="lead">
          Your personalized health risk predictor and smart fitness companion.
        </p>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <h3 style={{ color: '#005792' }}>What is FitInsight?</h3>
          <p>
            <strong>FitInsight</strong> is an AI-powered web platform that empowers users to take control of their health journey.
            By analyzing your health metrics, it predicts the percentage risk for <strong>heart disease</strong>, <strong>obesity</strong>.
          </p>
        </div>

        <div className="col-md-6">
          <h3 style={{ color: '#005792' }}> Why FitInsight?</h3>
          <ul>
            <li>📊 Get risk predictions in <strong>clear percentages</strong> – no confusing numbers.</li>
              
            <li> Built with <strong>React</strong>, <strong>Flask</strong>, and <strong>Machine Learning</strong> for accuracy and speed.</li>
            <li>Get your peronalized risk predictions</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 text-center">
        <p className="fst-italic text-success">
  “The groundwork for all happiness is good health.” – Leigh Hunt
</p>
      </div>
    </div>
  );
}

export default About;
