require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Import routes
const userRoutes = require('./Routes/UserRoutes');
const jewelleryRoutes = require('./Routes/JewelleryRoutes');
const customerRoutes = require('./Routes/CustomerRoutes');
const feedbackRoutes = require('./Routes/FeedbackRoutes');
const employeeRoutes = require('./Routes/EmployeeRoutes');
const salaryRoutes = require('./Routes/SalaryRoutes');
const supplierRoutes = require('./Routes/SupplierRoutes');
const inventoryRoutes = require('./Routes/InventoryRoutes');
const authRoutes = require('./Routes/AuthRoutes');
const gemRoutes = require('./Routes/GemRoutes');
const supplierlistRoutes = require('./Routes/SupplierListRoutes');
const orderRoutes = require('./Routes/OrderRoutes');

// Middleware
app.use(express.json());
app.use(cors()); // You can configure CORS options if needed

// Route middleware
app.use('/users', userRoutes);
app.use('/jewellery', jewelleryRoutes);
app.use('/customers', customerRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/employees', employeeRoutes);
app.use('/salaries', salaryRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/auth', authRoutes);
app.use('/api', gemRoutes);
app.use('/api/suppliers', supplierlistRoutes);
app.use('/orders', orderRoutes);


// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}!`);
});
