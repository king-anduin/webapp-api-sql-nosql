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
/**
 * @swagger
 * /nosql/get/client:
 *   get:
 *     description: Get all client
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/client/', async (req, res) => {
  const result = await client.find({});
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET client by id
/**
 * @swagger
 * /nosql/get/client/:_id:
 *   get:
 *     description: Get one client
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/client/:_id', async (req, res) => {
  const result = await client.findById(req.params._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
/**
 * @swagger
 * /nosql/post/client:
 *   post:
 *     description: Create a client
 *     parameters:
 *     - name: Max Mustermann
 *       description: Create a client
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.post('/post/client', async (req, res) => {
  try {
    var post = new client({
      field1: req.body.field1,
      firstname: req.body.firstname,
      surname: req.body.surname,
      gender: req.body.gender,
      clientnumber: null,
    });
    newClient = await post.save();
    var data = {
      clientnumber: `${req.body.firstname}_${req.body.surname}_${newClient._id.toString()}`,
    };
    await client.findByIdAndUpdate(newClient._id.toString(), data);
    const result = await client.findById(newClient._id.toString());
    res.status(201).json({ message: 'Client successfully created', client: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE client
/**
 * @swagger
 * /sql/delete/client/:_id:
 *   delete:
 *     description: Delete an Employee
 *     parameters:
 *     - _id: _id
 *       description: Delete an employee
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/client/:_id', async (req, res) => {
  const result = await client.findById(req.params._id);
  try {
    await result.remove();
    res.status(201).json({ message: 'Client successfully deleted', client: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//PUT
/**
 * @swagger
 * /nosql/update/client:
 *   put:
 *     description: Update an Employee
 *     parameters:
 *     - _id: _id
 *       description: Update an employee
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
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

// GET driver by id
router.get('/get/driver/:_id', async (req, res) => {
  const result = await driver.findById(req.params._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post('/post/driver', async (req, res) => {
  try {
    var post = new driver({
      field1: req.body.field1,
      firstname: req.body.firstname,
      surname: req.body.surname,
      city: req.body.city,
      country: req.body.country,
      license_plate: req.body.license_plate,
      drivernumber: null,
    });
    newDriver = await post.save();
    var data = {
      drivernumber: `${req.body.firstname}_${req.body.surname}_${newDriver._id.toString()}`,
    };
    await driver.findByIdAndUpdate(newDriver._id.toString(), data);
    const result = await driver.findById(newDriver._id.toString());
    res.status(201).json({ message: 'Driver successfully created', driver: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE driver
router.delete('/delete/driver/:_id', async (req, res) => {
  const result = await driver.findById(req.params._id);
  try {
    await result.remove();
    res.status(201).json({ message: 'Driver successfully deleted', driver: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

// GET ride by id
router.get('/get/ride/:_id', async (req, res) => {
  const result = await ride.findById(req.params._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post('/post/ride', async (req, res) => {
  try {
    var post = new ride({
      field1: req.body.field1,
      client_id: req.body.client_id,
      driver_id: req.body.driver_id,
      ride_date: req.body.ride_date,
      distance: req.body.distance,
      price: req.body.price,
    });
    newRide = await post.save();
    const result = await ride.findById(newRide._id.toString());
    res.status(201).json({ message: 'Ride successfully created', ride: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete/ride/:_id', async (req, res) => {
  const result = await ride.findById(req.params._id);
  try {
    await result.remove();
    res.status(201).json({ message: 'Ride successfully deleted', ride: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//PUT
router.put('/update/ride/:_id', async function (req, res) {
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

// GET waypoint by id
router.get('/get/waypoint/:_id', async (req, res) => {
  const result = await driver.findById(req.params._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
router.post('/post/waypoint', async (req, res) => {
  try {
    var post = new waypoint({
      field1: req.body.field1,
      ride_id: req.body.ride_id,
      number: req.body.number,
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
    });
    newWaypoint = await post.save();
    const result = await waypoint.findById(newWaypoint._id.toString());
    res.status(201).json({ message: 'Waypoint successfully created', waypoint: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE waypoint
router.delete('/delete/waypoint/:_id', async (req, res) => {
  const result = await waypoint.findById(req.params._id);
  try {
    await result.remove();
    res.status(201).json({ message: 'Waypoint successfully deleted', waypoint: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//PUT waypoint
router.put('/update/waypoint/:_id', async function (req, res) {
  try {
    var data = {
      field1: req.body.field1,
      ride_id: req.body.ride_id,
      number: req.body.number,
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
    };
    await waypoint.findByIdAndUpdate(req.params._id, data);
    const result = await waypoint.findById(req.params._id);
    res.status(201).json({ message: 'Waypoint successfully updated', waypoint: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export router
module.exports = router;
