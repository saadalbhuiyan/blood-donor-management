const fs = require('fs');
const path = require('path');

const getAllUniversities = (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../data/universities.json'));
        const universities = JSON.parse(data).map(u => u.name);
        res.status(200).json(universities);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load universities.', error: err.message });
    }
};

const getDepartmentsByUniversity = (req, res) => {
    const { university } = req.params;

    try {
        const data = fs.readFileSync(path.join(__dirname, '../data/universities.json'));
        const universities = JSON.parse(data);

        const uni = universities.find(u => u.name === university);
        if (!uni) {
            return res.status(404).json({ message: 'University not found.' });
        }

        res.status(200).json(uni.departments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to load departments.', error: err.message });
    }
};

module.exports = {
    getAllUniversities,
    getDepartmentsByUniversity
};
