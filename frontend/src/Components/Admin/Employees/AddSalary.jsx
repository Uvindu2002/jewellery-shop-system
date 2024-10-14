import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSalary = () => {
  const { id } = useParams(); // This is the MongoDB ID
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  
  const [basicSalary, setBasicSalary] = useState('');
  const [otRate, setOtRate] = useState('');
  const [otHours, setOtHours] = useState('');
  const [leaveDays, setLeaveDays] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [totalSalary, setTotalSalary] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/employees/${id}`);
        setEmployee(response.data);
        setBasicSalary(response.data.salary);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleCalculateSalary = () => {
    const ot = otRate * otHours;
    const leaveDeduction = leaveDays * dailyRate;
    const calculatedSalary = parseFloat(basicSalary) + ot - leaveDeduction;
    setTotalSalary(calculatedSalary);
  };

  const handleAddSalary = async () => {
    try {
      const updatedEmployee = {
        ...employee,
        salary: totalSalary,
      };
      await axios.put(`http://localhost:4000/employees/${id}`, updatedEmployee);
      navigate('/admindashboard/employee-details');
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Add Salary for Employee ID: {employee ? employee.EMPID : 'Loading...'}
      </Typography>
      <TextField
        label="Basic Salary"
        variant="outlined"
        value={basicSalary}
        onChange={(e) => setBasicSalary(e.target.value)}
        fullWidth
        disabled
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Overtime Rate"
        variant="outlined"
        value={otRate}
        onChange={(e) => setOtRate(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Overtime Hours"
        variant="outlined"
        value={otHours}
        onChange={(e) => setOtHours(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Leave Days"
        variant="outlined"
        value={leaveDays}
        onChange={(e) => setLeaveDays(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Daily Rate"
        variant="outlined"
        value={dailyRate}
        onChange={(e) => setDailyRate(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleCalculateSalary} sx={{ marginBottom: 2 }}>
        Calculate Salary
      </Button>

      {totalSalary && (
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="h5">Total Salary: {totalSalary.toFixed(2)}</Typography>
          <Button variant="contained" color="success" onClick={handleAddSalary} sx={{ marginTop: 2 }}>
            Save Salary
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddSalary;
