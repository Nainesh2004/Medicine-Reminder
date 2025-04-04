const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// Add reminder
router.post('/add', async (req, res) => {
    try {
        const reminder = new Reminder(req.body);
        await reminder.save();
        res.status(200).json({ message: "Reminder added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all reminders
router.get('/all', async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.json(reminders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
