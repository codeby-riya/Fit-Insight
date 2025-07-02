import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

function HeartForm() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [result, setResult] = useState(null); // For showing risk

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/heart/predict', formData);
      setResult(res.data); // { risk: ..., caption: ... }
    } catch (err) {
      setResult({ error: 'Prediction failed. Please try again.' });
    }
  };

  return (
    <Card className="p-4 shadow-sm border-0">
      <h4 className="mb-3">Heart Disease Risk Prediction</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* AGE */}
            <Form.Group className="mb-3">
              <Form.Label>Age (in years)</Form.Label>
              <Form.Control type="number" name="age" min="0" placeholder="e.g. 45" onChange={handleChange} required />
            </Form.Group>

            {/* GENDER */}
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="sex" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">Female</option>
                <option value="1">Male</option>
              </Form.Select>
            </Form.Group>

            {/* CHEST PAIN */}
            <Form.Group className="mb-3">
              <Form.Label>Chest Pain Type</Form.Label>
              <Form.Select name="cp" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">Typical Angina(Chest pain caused by physical activity or stress, relieved by rest)</option>
                <option value="1">Atypical Angina(Random chest pain)</option>
                <option value="2">Non-Anginal Pain(Chest pain not related to the heart (could be from muscles or stomach))</option>
                <option value="3">Asymptomatic(No chest pain at all )</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resting Blood Pressure (mm Hg)(Bp when you are at rest )</Form.Label>
              <Form.Control type="number" name="trestbps" min="0" step="10" placeholder="e.g. 130" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cholesterol (mg/dl)</Form.Label>
              <Form.Control type="number" name="chol" min="0" placeholder="e.g. 220" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fasting Blood Sugar</Form.Label>
              <Form.Select name="fbs" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">≤ 120 mg/dl</option>
                <option value="1">&gt; 120 mg/dl</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resting ECG Result</Form.Label>
              <Form.Select name="restecg" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Max Heart Rate Achieved during exercise</Form.Label>
              <Form.Control type="number" name="thalach" min="0" placeholder="e.g. 160" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Do you feel chest pain while exercising?</Form.Label>
              <Form.Select name="exang" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ST Depression (Oldpeak)</Form.Label>
              <Form.Control type="number" name="oldpeak" step="0.1" min="0" placeholder="e.g. 1.4" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Slope of ST Segment</Form.Label>
              <Form.Select name="slope" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Major Vessels Colored by Fluoroscopy</Form.Label>
              <Form.Select name="ca" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thalassemia</Form.Label>
              <Form.Select name="thal" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">Normal</option>
                <option value="1">Fixed Defect</option>
                <option value="2">Reversible Defect</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-3">
          <Button type="submit" variant="danger">Predict Risk</Button>
        </div>
      </Form>

      {result && (
        <Alert variant={result.risk > 70 ? "danger" : result.risk > 40 ? "warning" : "success"} className="mt-4">
          <h5>Predicted Heart Disease Risk: <strong>{result.risk}%</strong></h5>
          <p>{result.caption}</p>
        </Alert>
      )}
    </Card>
  );
}

export default HeartForm;
