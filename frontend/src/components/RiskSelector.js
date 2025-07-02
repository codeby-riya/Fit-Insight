
import React, { useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import HeartForm from './forms/HeartForm';
import ObesityForm from './forms/ObesityForm';


function RiskSelector() {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <Card className="p-4 shadow-sm border-0">
        <h4 className="mb-3">Select Risk Category</h4>
        <Form>
          <Form.Select value={selected} onChange={handleChange} className="mb-3">
            <option value="">-- Choose a health condition --</option>
            <option value="heart">Heart Disease</option>
            <option value="obesity">Obesity</option>
         
          </Form.Select>
        </Form>
      </Card>

      {selected === 'heart' && <HeartForm />}
      {selected === 'obesity' && <ObesityForm />}
    
    </>
  );
}

export default RiskSelector;
