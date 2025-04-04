const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    name: String,
    email: String,
    medicine: String,
    time: String,
    dosage: String,
    date: Date
});

module.exports = mongoose.model('Reminder', reminderSchema);
