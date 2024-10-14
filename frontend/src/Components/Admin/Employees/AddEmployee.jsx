/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/employees/create";

function AddEmployee({ onBack }) {
  const [employee, setEmployee] = useState({
    EMPID: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    address: '',
    salary: '' // Ensure you have this field in the state
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(''); // State to hold email error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setEmailError(''); // Reset email error state

    // Check for email validation
    if (!validateEmail(employee.email)) {
      setEmailError('Please enter a valid email address');
      return; // Stop form submission if email is invalid
    }

    try {
      await axios.post(URL, employee);
      alert('Employee added successfully');
      navigate('/admindashboard/employee-details');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!emailError} // Show error state if email is invalid
          helperText={emailError} // Display email error message
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="position-label">Position</InputLabel>
          <Select
            labelId="position-label"
            name="position"
            value={employee.position}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Senior Manager">Senior Manager</MenuItem>
            <MenuItem value="Junior Manager">Junior Manager</MenuItem>
            <MenuItem value="Trainee">Trainee</MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="Business Analyst">Business Analyst</MenuItem>
            <MenuItem value="Human Resources Specialist">Human Resources Specialist</MenuItem>
            <MenuItem value="Project Coordinator">Project Coordinator</MenuItem>
            <MenuItem value="Marketing Executive">Marketing Executive</MenuItem>
            <MenuItem value="Sales Representative">Sales Representative</MenuItem>
            <MenuItem value="Administrative Assistant">Administrative Assistant</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Phone"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={employee.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          name="salary"
          type="number" // Ensure it's a number
          value={employee.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Employee
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={onBack}
        >
          Back
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
}

export default AddEmployee;