const express = require('express');
const router = express.Router();
const SupplierController = require('../Controllers/SupplierListController'); // Adjust the path as necessary

// Routes for supplier operations
router.post('/', SupplierController.createSupplier);              // Create a new supplier
router.get('/', SupplierController.getSuppliers);                 // Get all suppliers
router.get('/:id', SupplierController.getSupplierById);          // Get a specific supplier by ID
router.put('/:id', SupplierController.updateSupplier);            // Update a specific supplier by ID
router.delete('/:id', SupplierController.deleteSupplier);         // Delete a specific supplier by ID

// Additional routes for managing items in a supplier
router.post('/:id/items', SupplierController.addItemToSupplier);  // Add an item to a supplier
router.delete('/:id/items', SupplierController.removeItemFromSupplier); // Remove an item from a supplier

module.exports = router;
