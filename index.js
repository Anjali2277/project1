
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Feedback Schema and Model
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Feedback Submission Endpoint
app.post('/submitFeedback', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Donation Schema and Model
const donationSchema = new mongoose.Schema({
  name: String,
  address: String,
  mobile: String,
  email: String,
  amount: Number,
  currency: String,
  paymentMethod: String,
  gender: String,
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);

// Donation Submission Endpoint
app.post('/submitDonation', async (req, res) => {
  const { name, address, mobile, email, amount, currency, paymentMethod, gender } = req.body;

  try {
    const donation = new Donation({ name, address, mobile, email, amount, currency, paymentMethod, gender });
    await donation.save();
    res.status(201).json({ message: 'Donation submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit donation' });
  }
});

const axios = require('axios');

// Disaster News Endpoint
app.get('/disasterNews', async (req, res) => {
  try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
              q: 'disaster',
              apiKey: process.env.NEWS_API_KEY,
          },
      });

      res.json(response.data.articles);  // Send the articles as JSON
  } catch (err) {
      console.error('Error fetching disaster news:', err);
      res.status(500).json({ error: 'Failed to fetch disaster news' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

