import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, CardActions, Typography, TextField, Grid, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/suppliers";

const fetchSupplierLists = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching supplier lists:", error);
    throw error;
  }
};

const abbreviateId = (id) => {
  return id.length > 8 ? `${id.substring(0, 8)}...` : id;
};

function SupplierListDetails() {
  const [supplierLists, setSupplierLists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSupplierLists().then(data => {
      setSupplierLists(data);
    }).catch(error => {
      console.error("Error fetching supplier lists:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-supplier-list/${id}`);
  };

  const deleteSupplierList = async (id) => {
    try {
      console.log(`Attempting to delete supplier list with ID: ${id}`);
      const response = await axios.delete(`${URL}/${id}`);
      
      if (response.status === 200) {
        console.log(`Successfully deleted supplier list with ID: ${id}`);
        // Update the supplier list immediately
        setSupplierLists(prev => prev.filter(item => item._id !== id));
        
        // Update noResults state if necessary
        setNoResults(prevLists => prevLists.length === 1); // Adjust as needed
      }
    } catch (error) {
      console.error("Error deleting supplier list:", error.response ? error.response.data : error.message);
    }
  };
  

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Supplier List Details Report", 10, 10);
    doc.autoTable({
      head: [['Supplier ID', 'Supplier Name', 'Items', 'Description']],
      body: supplierLists.map(item => [
        abbreviateId(item.SupId),
        item.SupName,
        item.items.join(', '),
        item.description || 'No Description'
      ]),
      startY: 20,
      margin: { top: 20 },
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
    });
    doc.save('supplier-list-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchSupplierLists().then(data => {
        setSupplierLists(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching supplier lists:", error);
      });
      return;
    }

    const filteredSupplierLists = supplierLists.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSupplierLists(filteredSupplierLists);
    setNoResults(filteredSupplierLists.length === 0);
  };

  const handleAddSupplier = () => {
    navigate('/admindashboard/add-supplier-list');
  };

  const handleBack = () => {
    navigate('/admindashboard/supplier-management'); // Adjust this path to your Supplier Management page
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Supplier List Details
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '250px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey.300',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ borderRadius: 2 }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleAddSupplier}
          sx={{
            borderRadius: 2,
            marginLeft: 'auto',
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
          startIcon={<Add />}
        >
          Add Supplier
        </Button>
      </Box>

      <Grid container spacing={2}>
        {noResults ? (
          <Grid item xs={12}>
            <Typography align="center">No supplier lists found.</Typography>
          </Grid>
        ) : (
          supplierLists.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{abbreviateId(item.SupId)}</Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Supplier Name:</strong> {item.SupName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Items:</strong> {item.items.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Description:</strong> {item.description || 'No Description'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteSupplierList(item._id)} sx={{ color: 'error.main' }}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, marginTop: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePDF}
          sx={{ borderRadius: 2 }}
          startIcon={<Print />}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          sx={{ borderRadius: 2 }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}

export default SupplierListDetails;
