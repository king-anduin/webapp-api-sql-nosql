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
router.get('/get/client', async (req, res) => {
  const result = await client.findById(req.body._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post('/post/client', function (req, res) {
  try {
    var post = new client({
      field1: req.body.field1,
      name: req.body.name,
      gender: req.body.gender,
      clientnumber: req.body.clientnumber,
    });
    post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE client
router.delete('/delete/client/:_id', async (req, res) => {
  const result = await client.findById(req.params._id);
  if (result) {
    await result.remove();
  }
  return res.send(result);
});

//PUT
router.put('/update/client/:_id', async function (req, res) {
  try {
    var data = {
      field1: req.body.field1,
      firstname: req.body.firstname,
      surname: req.body.surname,
      gender: req.body.gender,
      clientnumber: req.body.clientnumber,
    };
    await client.findByIdAndUpdate(req.params._id, data);
    const result = await client.findById(req.params._id);
    res.status(201).json({ message: 'Client successfully updated', client: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//------------------------------- DRIVER routes -------------------------------//
// GET driver
router.get('/get/driver', async (req, res) => {
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
    field1: req.body.field1,
    name: req.body.name,
    city: req.body.city,
    license_plate: req.body.license_plate,
    drivernumber: req.body.drivernumber,
  });
  post.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.status(201).json(post);
  });
});

// DELETE client
router.delete('/delete/driver/:_id', async (req, res) => {
  const message = await driver.findById(req.params._id);
  if (message) {
    await message.remove();
  }
  return res.send(message);
});

//PUT
router.put('/update/driver/:_id', async function (req, res) {
  try {
    var data = {
      field1: req.body.field1,
      firstname: req.body.firstname,
      surname: req.body.surname,
      city: req.body.city,
      country: req.body.country,
      licence_plate: req.body.licence_plate,
      drivernumber: req.body.drivernumber,
    };
    await driver.findByIdAndUpdate(req.params._id, data);
    const result = await driver.findById(req.params._id);
    res.status(201).json({ message: 'Driver successfully updated', driver: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//------------------------------- RIDE routes -------------------------------//
// GET ride
router.get('/get/ride', async (req, res) => {
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
    res.status(201).json(post);
  });
});

// DELETE client
router.delete('/delete/ride/:_id', async (req, res) => {
  const result = await ride.findById(req.params._id);
  if (result) {
    await result.remove();
  }
  return res.send(result);
});
//PUT
router.put('/update/driver/:_id', async function (req, res) {
  try {
    var data = {
      field1: req.body.field1,
      client_id: req.body.client_id,
      driver_id: req.body.driver_id,
      ride_date: req.body.ride_date,
      distance: req.body.distance,
      price: req.body.price,
    };
    await ride.findByIdAndUpdate(req.params._id, data);
    const result = await ride.findById(req.params._id);
    res.status(201).json({ message: 'Ride successfully updated', ride: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//------------------------------- WAYPOINT routes -------------------------------//
// Get waypoint
router.get('/get/waypoint', async (req, res) => {
  const result = await waypoint.find(req.body);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post('/post/waypoint', function (req, res, next) {
  var post = new waypoint({
    id: req.body.id,
    ride_id: req.body.ride_id,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  post.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.status(201).json(post);
  });
});

// DELETE client
router.delete('/delete/waypoint/:_id', async (req, res) => {
  const result = await waypoint.findById(req.params._id);
  if (result) {
    await result.remove();
  }
  return res.send(result);
});
module.exports = router;
