const SupplierList = require('../Model/SupplierListModel'); // Adjust the path as necessary

// Create a new supplier
exports.createSupplier = async (req, res) => {
  const { SupId, SupName, items, description } = req.body;

  try {
    const newSupplier = new SupplierList({
      SupId,
      SupName,
      items, // Expecting an array of strings
      description,
    });

    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierList.find(); // No populate needed for items
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await SupplierList.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await SupplierList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await SupplierList.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) return res.status(404).json({ message: 'Supplier not found' });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add an item to the supplier's item list
exports.addItemToSupplier = async (req, res) => {
  const { item } = req.body; // Assuming you're sending a string to add

  try {
    const supplier = await SupplierList.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    supplier.items.push(item); // Add the new item
    await supplier.save();

    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove an item from the supplier's item list
exports.removeItemFromSupplier = async (req, res) => {
  const { item } = req.body; // Assuming you're sending a string to remove

  try {
    const supplier = await SupplierList.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    supplier.items = supplier.items.filter(i => i !== item); // Remove the item
    await supplier.save();

    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
