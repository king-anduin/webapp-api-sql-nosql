/* eslint-disable no-useless-catch */
const express = require('express');

const router = express.Router();

const { client, driver, ride, waypoint } = require('./models-sequelize.js');
//------------------------------- CLIENT routes -------------------------------//
// GET
router.get('/get/client', async (req, res) => {
  let task = req.body;
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
  try {
    const newClient = await task.save();
    res.status(201).send(newClient);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
// DELETE
router.delete('/delete/client/', async (req, res) => {
  let task = req.body;
  try {
    const result = await client.destroy(task);
    res.sendStatus(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// UPDATE
router.put('/update/client', async (req, res, next) => {
  await client
    .update({ name: req.body.name, gender: req.body.gender }, { where: { id: req.body.id } })
    .then(function (rowsUpdated) {
      res.json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
});
//------------------------------- DRIVER routes -------------------------------//
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
  try {
    const newDriver = await task.save();
    res.status(201).send(newDriver);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
// DELETE
router.delete('/delete/driver/', async (req, res) => {
  let task = req.body;
  try {
    const result = await driver.destroy(task);
    res.sendStatus(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// UPDATE
router.put('/update/driver', async (req, res, next) => {
  await driver
    .update(
      { name: req.body.name, city: req.body.city, license_plate: req.body.license_plate },
      { where: { id: req.body.id } }
    )
    .then(function (rowsUpdated) {
      res.json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
});
//------------------------------- RIDE routes -------------------------------//
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
  try {
    const newRide = await task.save();
    res.status(201).send(newRide);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
// DELETE
router.delete('/delete/ride/', async (req, res) => {
  const ids = await ride.findAll(req.body);
  console.log(ids);
  try {
    //await ride.destroy(req.body);
    res.json({ message: 'Deleted Subscriber' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// UPDATE
router.put('/update/ride', async (req, res, next) => {
  await ride
    .update(
      {
        client_id: req.body.client_id,
        driver_id: req.body.driver_id,
        ride_date: req.body.ride_date,
        distance: req.body.distance,
        price: req.body.price,
      },
      { where: { id: req.body.id } }
    )
    .then(function (rowsUpdated) {
      res.json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
});
//------------------------------- WAYPOINT routes -------------------------------//
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
// DELETE
router.delete('/delete/waypoint/', async (req, res) => {
  let task = req.body;
  try {
    const result = await waypoint.destroy(task);
    res.sendStatus(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// UPDATE
router.put('/update/waypoint', async (req, res, next) => {
  await waypoint
    .update(
      {
        ride_id: req.body.ride_id,
        number: req.body.number,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      { where: { id: req.body.id } }
    )
    .then(function (rowsUpdated) {
      res.json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
});

// Export routes
module.exports = router;
