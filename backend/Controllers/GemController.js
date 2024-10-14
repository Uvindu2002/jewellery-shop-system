const Gem = require('../Model/GemModel'); // Assuming you have a Gem model

// Generate gem ID with leading zeros
const generateGemId = async () => {
    const lastGem = await Gem.findOne().sort({ GID: -1 }).limit(1);
    const lastId = lastGem ? parseInt(lastGem.GID.replace('G', ''), 10) : 0;
    const newId = `G${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new gem
exports.createGem = async (req, res) => {
    try {
        const { image, name, color, price, weight, category, quantity, status, description } = req.body;
        const GID = await generateGemId(); // Generate new gem ID
        const newGem = new Gem({ GID, name, color, price, weight, category, quantity, status, image, description });
        await newGem.save();

        res.status(201).json({ message: 'Gem created successfully', gem: newGem });
    } catch (error) {
        res.status(500).json({ message: 'Error creating gem', error });
    }
};

// Get all gems
exports.getAllGems = async (req, res) => {
    try {
        const gems = await Gem.find();
        res.status(200).json(gems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving gems', error });
    }
};

// Get a single gem by ID
exports.getGemById = async (req, res) => {
    const id = req.params.id;

    try {
        const gem = await Gem.findById(id);
        if (!gem) {
            return res.status(404).json({ message: 'Gem not found' });
        }
        res.status(200).json(gem);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving gem', error });
    }
};

// Update a gem by ID
exports.updateGem = async (req, res) => {
    const id = req.params.id;
    const { image, name, color, price, weight, category, quantity, status, description } = req.body;

    try {
        const updatedGem = await Gem.findByIdAndUpdate(
            id,
            { name, color, price, weight, category, quantity, status, image, description },
            { new: true } // Return the updated gem
        );

        if (!updatedGem) {
            return res.status(404).json({ message: 'Gem not found' });
        }

        res.status(200).json({ message: 'Gem updated successfully', gem: updatedGem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating gem', error });
    }
};

// Delete a gem by ID
exports.deleteGem = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedGem = await Gem.findByIdAndDelete(id);
        if (!deletedGem) {
            return res.status(404).json({ message: 'Gem not found' });
        }

        res.status(200).json({ message: 'Gem deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gem', error });
    }
};
