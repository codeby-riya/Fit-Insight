import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, OverlayTrigger, Tooltip, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';

function ObesityForm() {
  const [formData, setFormData] = useState({
    Gender: '',
    Age: '',
    Height: '',
    Weight: '',
    family_history_with_overweight: '',
    FAVC: '',
    FCVC: '',
    NCP: '',
    CAEC: '',
    SMOKE: '',
    CH2O: '',
    SCC: '',
    FAF: '',
    TUE: '',
    CALC: '',
    MTRANS: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://fit-insight.onrender.com/api/obesity/predict', formData);
      setResult(res.data);
    } catch (err) {
      setResult({ error: 'Error predicting obesity risk.' });
    }
  };

  const getBadgeVariant = (level) => {
    if (level === 'Low') return 'success';
    if (level === 'Moderate') return 'warning';
    return 'danger';
  };

  const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;

  return (
    <Card className="p-4 shadow-sm border-0">
      <h4 className="mb-3">Obesity Risk Prediction</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check inline label="Male" name="Gender" value="Male" type="radio" onChange={handleChange} />
                <Form.Check inline label="Female" name="Gender" value="Female" type="radio" onChange={handleChange} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age (in years)</Form.Label>
              <Form.Control type="number" name="Age" min="0" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Height (in meters)</Form.Label>
              <Form.Control type="number" step="0.01" min="0" placeholder="e.g. 1.65" name="Height" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Weight (in kg)</Form.Label>
              <Form.Control type="number" min="0" placeholder="e.g. 58" name="Weight" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Family History of Overweight</Form.Label>
              <div>
                <Form.Check inline label="Yes" name="family_history_with_overweight" value="yes" type="radio" onChange={handleChange} />
                <Form.Check inline label="No" name="family_history_with_overweight" value="no" type="radio" onChange={handleChange} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>High-Calorie Food Consumption</Form.Label>
              <div>
                <Form.Check inline label="Yes" name="FAVC" value="yes" type="radio" onChange={handleChange} />
                <Form.Check inline label="No" name="FAVC" value="no" type="radio" onChange={handleChange} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <OverlayTrigger overlay={renderTooltip('1 = rarely, 2 = sometimes, 3 = always')}>
                <Form.Label>Vegetable Consumption (1–3)</Form.Label>
              </OverlayTrigger>
              <Form.Control type="number" min="1" max="3" name="FCVC" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <OverlayTrigger overlay={renderTooltip('Main meals per day')}>
                <Form.Label>Meals Per Day</Form.Label>
              </OverlayTrigger>
              <Form.Control type="number" min="1" name="NCP" onChange={handleChange} required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Snacking Between Meals</Form.Label>
              <Form.Select name="CAEC" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Frequently">Frequently</option>
                <option value="Always">Always</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Do You Smoke?</Form.Label>
              <div>
                <Form.Check inline label="Yes" name="SMOKE" value="yes" type="radio" onChange={handleChange} />
                <Form.Check inline label="No" name="SMOKE" value="no" type="radio" onChange={handleChange} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <OverlayTrigger overlay={renderTooltip('Daily water intake in litres')}>
                <Form.Label>Water Intake (litres)</Form.Label>
              </OverlayTrigger>
              <Form.Control type="number" step="0.5" min="0" name="CH2O" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Monitor Calorie Intake?</Form.Label>
              <div>
                <Form.Check inline label="Yes" name="SCC" value="yes" type="radio" onChange={handleChange} />
                <Form.Check inline label="No" name="SCC" value="no" type="radio" onChange={handleChange} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <OverlayTrigger overlay={renderTooltip('Hours per week of physical activity')}>
                <Form.Label>Physical Activity (hrs/week)</Form.Label>
              </OverlayTrigger>
              <Form.Control type="number" step="0.5" name="FAF" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <OverlayTrigger overlay={renderTooltip('Technology use hours per day')}>
                <Form.Label>Technology Usage (hrs/day)</Form.Label>
              </OverlayTrigger>
              <Form.Control type="number" step="0.5" name="TUE" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alcohol Consumption</Form.Label>
              <Form.Select name="CALC" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Frequently">Frequently</option>
                <option value="Always">Always</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Transportation Mode</Form.Label>
              <Form.Select name="MTRANS" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Walking">Walking</option>
                <option value="Public_Transportation">Public Transportation</option>
                <option value="Automobile">Car</option>
                <option value="Bike">Bike</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <Button type="submit" variant="success">Predict Risk</Button>
        </div>
      </Form>

      {result && !result.error && (
        <Card className="mt-4 p-3 bg-light">
          <h5>Prediction Results</h5>
          <p><strong>Category:</strong> {result.category}</p>
          <p>
            <strong>Risk:</strong> {result.risk}%{' '}
            <Badge bg={getBadgeVariant(result.level)}>{result.level} Risk</Badge>
          </p>
          <p><strong>Insight:</strong> {result.message}</p>
        </Card>
      )}

      {result && result.error && (
        <Alert variant="danger" className="mt-3">
          {result.error}
        </Alert>
      )}
    </Card>
  );
}

export default ObesityForm;
