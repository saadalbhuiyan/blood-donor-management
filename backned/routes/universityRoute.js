const express = require("express");
const router = express.Router();
const universities = require("../data/universities.json");

router.get("/", (req, res) => {
    res.json(universities.map(u => u.name));
});

router.get("/departments", (req, res) => {
    const universityName = req.query.university;
    const uni = universities.find(u => u.name === universityName);
    if (!uni) return res.status(404).json({ message: "University not found." });
    res.json(uni.departments);
});

module.exports = router;
