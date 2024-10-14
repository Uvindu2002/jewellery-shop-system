/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/suppliers";

function AddSupplierList() {
    const [formData, setFormData] = useState({
        SupId: '',
        SupName: '',
        items: '',
        description: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const itemsArray = formData.items.split(',').map(item => item.trim());
            const response = await axios.post(URL, {
                ...formData,
                items: itemsArray
            });
            setSnackbarMessage('Supplier list added successfully');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/admindashboard/supplier-list-details'), 2000);
        } catch (error) {
            setSnackbarMessage('Error adding supplier list: ' + (error.response ? error.response.data.message : error.message));
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Add Supplier List</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Supplier ID"
                    name="SupId"
                    variant="outlined"
                    fullWidth
                    value={formData.SupId}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Supplier Name"
                    name="SupName"
                    variant="outlined"
                    fullWidth
                    value={formData.SupName}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Items (comma-separated)"
                    name="items"
                    variant="outlined"
                    fullWidth
                    value={formData.items}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Add Supplier List
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)} 
                    sx={{ marginTop: 2, marginLeft: 2 }}
                >
                    Back
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AddSupplierList;
