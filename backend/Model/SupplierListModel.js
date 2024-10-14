const mongoose = require('mongoose');

const supplierListSchema = new mongoose.Schema({
  SupId: {
    type: String,
    required: true,
    unique: true,
  },
  SupName: {
    type: String,
    required: true,
  },
  items: [{
    type: [String],
    required: true,
  }],
  description: {
    type: String,
  }
});

const SupplierList = mongoose.model('SupplierList', supplierListSchema);

module.exports = SupplierList;
