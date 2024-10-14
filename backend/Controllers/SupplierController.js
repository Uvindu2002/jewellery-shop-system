const Supplier = require('../Model/SupplierModel');

// Create a new supplier order
exports.createSupplier = async (req, res) => {
    try {
        const { SupOrderID, type, quantity, InvID, SupID, status, description } = req.body;

        // Check if SupOrderID already exists
        const existingSupplier = await Supplier.findOne({ SupOrderID });
        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier order ID already exists' });
        }

        // Create a new supplier order
        const newSupplier = new Supplier({
            SupOrderID,
            type,
            quantity,
            InvID,
            SupID,
            status, // Optional, defaults to 'Pending' if not provided
            description
        });

        await newSupplier.save();

        res.status(201).json({ message: 'Supplier order created successfully', supplier: newSupplier });
    } catch (error) {
        res.status(500).json({ message: 'Error creating supplier order', error });
    }
};

// Get all supplier orders
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving supplier orders', error });
    }
};

// Get a single supplier order by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier order not found' });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving supplier order', error });
    }
};

// Update a supplier order by ID
exports.updateSupplier = async (req, res) => {
    try {
        const { SupOrderID, type, quantity, InvID, SupID, status, description } = req.body;

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { SupOrderID, type, quantity, InvID, SupID, status, description },
            { new: true } // Return the updated supplier order
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier order not found' });
        }

        res.status(200).json({ message: 'Supplier order updated successfully', supplier: updatedSupplier });
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier order', error });
    }
};

// Delete a supplier order by ID
exports.deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier order not found' });
        }

        res.status(200).json({ message: 'Supplier order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier order', error });
    }
};
