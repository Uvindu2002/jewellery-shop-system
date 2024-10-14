import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/suppliers";

function UpdateSupplierList() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [supplier, setSupplier] = useState({
    SupId: '',
    SupName: '',
    items: [],
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        setSupplier(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supplier details:", error);
        setLoading(false);
      }
    };

    fetchSupplierDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'items') {
      setSupplier(prev => ({ ...prev, items: value.split(',').map(item => item.trim()) }));
    } else {
      setSupplier(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${id}`, supplier);
      setSnackbarMessage('Supplier updated successfully!');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/admindashboard/supplier-list-details'); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error updating supplier:", error);
      setSnackbarMessage('Failed to update supplier. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Update Supplier List
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Supplier ID"
          name="SupId"
          value={supplier.SupId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled // Prevent editing the ID
        />
        <TextField
          label="Supplier Name"
          name="SupName"
          value={supplier.SupName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Items (comma separated)"
          name="items"
          value={supplier.items.join(', ')}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={supplier.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
          Update Supplier
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default UpdateSupplierList;
