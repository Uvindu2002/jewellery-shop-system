/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/gems"; // Updated to point to gems

function UpdateGem() {
  const { GID } = useParams(); // Use GID for gems
  const [gem, setGem] = useState({
    image: '',
    name: '',
    color: '',
    price: '',
    weight: '',
    category: '',
    quantity: '',
    status: 'available'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching gem with GID:", GID);
    const fetchGem = async () => {
      try {
        const response = await axios.get(`${URL}/${GID}`);
        console.log("Fetched gem data:", response.data);
        setGem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gem:", error);
        setError(error.response ? error.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchGem();
  }, [GID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGem({ ...gem, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${URL}/${GID}`, gem);
      alert('Gem updated successfully');
      navigate('/admindashboard/gem-management');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Update Gem</Typography>
      <TextField
        label="Image URL"
        name="image"
        value={gem.image}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={gem.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Color"
        name="color"
        value={gem.color}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={gem.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Weight"
        name="weight"
        type="number"
        value={gem.weight}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        name="category"
        value={gem.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={gem.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        name="status"
        select
        SelectProps={{ native: true }}
        value={gem.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <option value="available">Available</option>
        <option value="out of stock">Out of Stock</option>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ marginTop: 2 }}
      >
        Update Gem
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default UpdateGem;
