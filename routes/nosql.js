/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

// Connection to MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

//------------------------------- Mongo routes -------------------------------//
const { client, driver, ride, waypoint } = require('./schema-mongo.js');

// GET client
router.get('/client', async (req, res) => {
  const result = await client.find(req.body);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET driver
router.get('/driver', async (req, res) => {
  const result = await driver.find(req.body);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET ride
router.get('/ride', async (req, res) => {
  const result = await ride.find(req.body);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get waypoint
router.get('/waypoint', async (req, res) => {
  const result = await waypoint.find(req.body);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
