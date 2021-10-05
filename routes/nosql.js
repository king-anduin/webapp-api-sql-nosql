/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

// Connection to MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

//------------------------------- CLIENT routes -------------------------------//
// GET
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

//POST
router.post('/post/client', function (req, res, next) {
  var post = new client({
    id: req.body.id,
    name: req.body.name,
    gender: req.body.gender,
  });
  post.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(201, post);
  });
});
//------------------------------- DRIVER routes -------------------------------//
// GET driver
router.get('/driver', async (req, res) => {
  const result = await driver.find(req.body);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post('/post/driver', function (req, res, next) {
  var post = new driver({
    id: req.body.id,
    name: req.body.name,
    city: req.body.city,
    license_plate: req.body.license_plate,
  });
  post.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(201, post);
  });
});
//------------------------------- RIDE routes -------------------------------//
// GET ride
router.get('/ride', async (req, res) => {
  const result = await ride.find(req.body);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post('/post/ride', function (req, res, next) {
  var post = new ride({
    id: req.body.id,
    client_id: req.body.client_id,
    driver_id: req.body.driver_id,
    ride_date: req.body.ride_date,
    distance: req.body.distance,
    price: req.body.price,
  });
  post.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(201, post);
  });
});
//------------------------------- WAYPOINT routes -------------------------------//
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
