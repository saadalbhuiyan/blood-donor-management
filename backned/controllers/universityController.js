const fs = require('fs');
const path = require('path');

// Get a list of all universities
const getAllUniversities = (req, res) => {
    try {
        // Read and parse the universities data
        const data = fs.readFileSync(path.join(__dirname, '../data/universities.json'));
        const universities = JSON.parse(data).map(u => u.name); // Extract university names

        // Return the list of universities
        res.status(200).json(universities);
    } catch (err) {
        // Handle errors while reading the file or parsing JSON
        res.status(500).json({ message: 'Failed to load universities.', error: err.message });
    }
};

// Get departments by university name
const getDepartmentsByUniversity = (req, res) => {
    const { university } = req.params;

    try {
        // Read and parse the universities data
        const data = fs.readFileSync(path.join(__dirname, '../data/universities.json'));
        const universities = JSON.parse(data);

        // Find the university by name
        const uni = universities.find(u => u.name === university);
        if (!uni) {
            // Handle case where university is not found
            return res.status(404).json({ message: 'University not found.' });
        }

        // Return the departments of the found university
        res.status(200).json(uni.departments);
    } catch (err) {
        // Handle errors while reading the file or parsing JSON
        res.status(500).json({ message: 'Failed to load departments.', error: err.message });
    }
};

module.exports = {
    getAllUniversities,
    getDepartmentsByUniversity
};
