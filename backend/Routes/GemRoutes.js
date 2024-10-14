const express = require('express');
const router = express.Router();
const GemController = require('../Controllers/GemController'); // Adjust the path as necessary

// Route to create a new gem
router.post('/gems', GemController.createGem);

// Route to get all gems
router.get('/gems', GemController.getAllGems);

// Route to get a gem by ID
router.get('/gems/:id', GemController.getGemById);

// Route to update a gem by ID
router.put('/gems/:id', GemController.updateGem);

// Route to delete a gem by ID
router.delete('/gems/:id', GemController.deleteGem);

module.exports = router;
