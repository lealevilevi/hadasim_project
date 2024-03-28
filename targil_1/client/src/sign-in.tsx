import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SignIn()
 {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName"  className='row justify-content-center'>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className='row justify-content-center'>
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className='row justify-content-center'>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword"  className='row justify-content-center'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <div  className='row justify-content-center mt-4'>
            <Button variant="primary" type="submit" >
              Sign In
            </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

