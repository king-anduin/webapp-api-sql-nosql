/* eslint-disable no-useless-catch */
const express = require('express');

const router = express.Router();

const { client, driver, ride, waypoint } = require('./models-sequelize.js');

//------------------------------- MariaDB routes -------------------------------//
// GET
router.get('/get/client', async (req, res) => {
  let task = req.body;
  console.log(task);
  try {
    const result = await client.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});
// POST
router.post('/post/client', async (req, res) => {
  let task = new client({
    name: req.body.name,
    gender: req.body.gender,
  });
  console.log(task);
  try {
    const newClient = await task.save();
    res.status(201).send(newClient);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
// GET
router.get('/get/driver', async (req, res) => {
  let task = req.body;
  try {
    const result = await driver.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});
// POST
router.post('/post/driver', async (req, res) => {
  let task = new driver({
    name: req.body.name,
    city: req.body.city,
    license_plate: req.body.license_plate,
  });
  console.log(task);
  try {
    const newDriver = await task.save();
    res.status(201).send(newDriver);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
// GET
router.get('/get/ride', async (req, res) => {
  let task = req.body;
  try {
    const result = await ride.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});
// POST
router.post('/post/ride', async (req, res) => {
  let task = new ride({
    client_id: req.body.client_id,
    driver_id: req.body.driver_id,
    ride_date: req.body.ride_date,
    distance: req.body.distance,
    price: req.body.price,
  });
  console.log(task);
  try {
    const newRide = await task.save();
    res.status(201).send(newRide);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
// GET
router.get('/get/waypoint', async (req, res) => {
  let task = req.body;
  try {
    const result = await waypoint.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});
// POST
router.post('/post/waypoint', async (req, res) => {
  let task = new waypoint({
    ride_id: req.body.ride_id,
    number: req.body.number,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  console.log(task);
  try {
    const newWaypoint = await task.save();
    res.status(201).send(newWaypoint);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
