/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

//------------------------------- Mongo routes -------------------------------//
// Connection to MongoDB
const mongoose = require('mongoose');
const client = require('./schema-mongo.js');
mongoose.connect(process.env.MONGODB, () => console.log('connected to DB'));

// GET client
router.get('/client', async (req, res) => {
  try {
    const result = await client.find();
    res.json(result);
  } catch (error) {
    res.status.apply(500).json({ message: error.message });
  }
});

// GET driver
router.get('/driver', (req, res) => {
  res.send('driver');
});

// GET ride
router.get('/ride', (req, res) => {
  res.send('ride');
});

// Get waypoint
router.get('/waypoint', (req, res) => {
  res.send('waypoint');
});

module.exports = router;
