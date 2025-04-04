const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reminderRoutes = require('./routes/reminderRoutes');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://oteaching038:nai@cluster0.3xmiyul.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.use('/api/reminders', reminderRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Add this inside server.js (bottom)
const nodemailer = require('nodemailer');
const Reminder = require('./models/Reminder');
const cron = require('node-cron');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test14@gmail.com', // replace
    pass: 'test'     // replace
  }
});

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const reminders = await Reminder.find({ date: { $eq: today } });
  reminders.forEach(rem => {
    const mailOptions = {
      from: 'shahnainesh14@gmail.com',
      to: rem.email,
      subject: `Medicine Reminder: ${rem.medicine}`,
      text: `Hello ${rem.name},\n\nThis is your reminder to take ${rem.medicine} (${rem.dosage}) at ${rem.time}.\n\nStay healthy!`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("❌ Email error:", error);
      else console.log("📧 Reminder sent:", info.response);
    });
  });
});
