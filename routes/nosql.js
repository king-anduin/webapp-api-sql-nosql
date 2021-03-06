/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

// Connection to MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

//---------------------- Basic authorization for API usage ----------------//
const basicAuth = require('express-basic-auth');
const auth = basicAuth({
  users: { admin: `${process.env.SUPERSECRET}` },
});
//------------------------------- CLIENT routes -------------------------------//
// GET
const { client, driver, ride, waypoint, statistics, overview } = require('./schema-mongo.js');

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
router.get('/get/client/', auth, async (req, res) => {
  const result = await client
    .find(req.body)
    .skip(req.body.skip)
    .limit(req.body.limit)
    .sort(req.body.sort);
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
router.get('/get/client/:_id', auth, async (req, res) => {
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
router.post('/post/client', auth, async (req, res) => {
  const count = (await client.count()) + 1;
  console.log(count);
  try {
    var post = new client({
      _id: count,
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
 * /nosql/delete/client/:_id:
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
router.delete('/delete/client/:_id', auth, async (req, res) => {
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
 * /nosql/update/client/:_id:
 *   put:
 *     description: Update a client
 *     parameters:
 *     - _id: _id
 *       description: Update a client
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.put('/update/client/:_id', auth, async function (req, res) {
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
/**
 * @swagger
 * /nosql/get/driver:
 *   get:
 *     description: Get all driver
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/driver', auth, async (req, res) => {
  const result = await driver
    .find(req.body)
    .skip(req.body.skip)
    .limit(req.body.limit)
    .sort(req.body.sort);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET driver by id
/**
 * @swagger
 * /nosql/get/driver/:_id:
 *   get:
 *     description: Get one driver
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/driver/:_id', auth, async (req, res) => {
  const result = await driver.findById(req.params._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
/**
 * @swagger
 * /nosql/post/driver:
 *   post:
 *     description: Create a driver
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
router.post('/post/driver', auth, async (req, res) => {
  const count = (await driver.count()) + 1;
  try {
    var post = new driver({
      _id: count,
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
/**
 * @swagger
 * /nosql/delete/driver/:_id:
 *   delete:
 *     description: Delete an driver
 *     parameters:
 *     - _id: _id
 *       description: Delete an driver
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/driver/:_id', auth, async (req, res) => {
  const result = await driver.findById(req.params._id);
  try {
    await result.remove();
    res.status(201).json({ message: 'Driver successfully deleted', driver: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//PUT
/**
 * @swagger
 * /nosql/update/driver/:_id:
 *   put:
 *     description: Update a driver
 *     parameters:
 *     - _id: _id
 *       description: Update a driver
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.put('/update/driver/:_id', auth, async function (req, res) {
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
/**
 * @swagger
 * /nosql/get/ride:
 *   get:
 *     description: Get all rides
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/ride', auth, async (req, res) => {
  const result = await ride
    .find(req.body)
    .skip(req.body.skip)
    .limit(req.body.limit)
    .sort(req.body.sort);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET ride by id
/**
 * @swagger
 * /nosql/get/ride/:_id:
 *   get:
 *     description: Get one ride
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/ride/:_id', auth, async (req, res) => {
  const result = await ride.findById(req.params._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
/**
 * @swagger
 * /nosql/post/ride:
 *   post:
 *     description: Create a ride
 *     parameters:
 *     - name: Max Mustermann
 *       description: Create a ride
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.post('/post/ride', auth, async (req, res) => {
  const count = (await ride.count()) + 1;
  try {
    var post = new ride({
      _id: count,
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

// DELETE ride
/**
 * @swagger
 * /nosql/delete/ride/:_id:
 *   delete:
 *     description: Delete a ride
 *     parameters:
 *     - _id: _id
 *       description: Delete a ride
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/ride/:_id', auth, async (req, res) => {
  const result = await ride.findById(req.params._id);
  try {
    await result.remove();
    res.status(201).json({ message: 'Ride successfully deleted', ride: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//PUT
/**
 * @swagger
 * /nosql/update/ride/:_id:
 *   put:
 *     description: Update a ride
 *     parameters:
 *     - _id: _id
 *       description: Update a ride
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.put('/update/ride/:_id', auth, async function (req, res) {
  try {
    var data = {
      id: req.body.id,
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
// GET waypoint
/**
 * @swagger
 * /nosql/get/waypoint:
 *   get:
 *     description: Get all waypoints
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/waypoint', auth, async (req, res) => {
  const result = await waypoint
    .find(req.body)
    .skip(req.body.skip)
    .limit(req.body.limit)
    .sort(req.body.sort);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET waypoint by id
/**
 * @swagger
 * /nosql/get/waypoint/:_id:
 *   get:
 *     description: Get one waypoint
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/waypoint/:_id', auth, async (req, res) => {
  const result = await waypoint.findById(req.params._id);
  try {
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST
/**
 * @swagger
 * /nosql/post/waypoint:
 *   post:
 *     description: Create a waypoint
 *     parameters:
 *     - name: Max Mustermann
 *       description: Create a waypoint
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.post('/post/waypoint', auth, async (req, res) => {
  const count = (await waypoint.count()) + 1;
  try {
    var post = new waypoint({
      _id: count,
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
/**
 * @swagger
 * /nosql/delete/waypoint/:_id:
 *   delete:
 *     description: Delete a waypoint
 *     parameters:
 *     - _id: _id
 *       description: Delete a waypoint
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/waypoint/:_id', auth, async (req, res) => {
  const result = await waypoint.findById(req.params._id);
  try {
    await result.remove();
    res.status(201).json({ message: 'Waypoint successfully deleted', waypoint: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//PUT waypoint
/**
 * @swagger
 * /nosql/update/waypoint/:_id:
 *   put:
 *     description: Update a waypoint
 *     parameters:
 *     - _id: _id
 *       description: Update a waypoint
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.put('/update/waypoint/:_id', auth, async function (req, res) {
  try {
    var data = {
      field1: req.body.field1,
      ride_id: req.body.ride_ids,
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

//-------------------------- GET COUNT(rides) -----------------------//
/**
 * @swagger
 * /sql/get/overview/:_id:
 *   get:
 *     description: Overview as seen in the wireframe
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/overview/:_id', auth, async (req, res) => {
  const result = await overview.findById(req.params._id);
  try {
    res.status(200).json({ message: 'Overview', overview: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /nosql/get/overview:
 *   get:
 *     description: Overview as seen in the wireframe
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/overview/', auth, async (req, res) => {
  const result = await overview
    .find(req.body)
    .skip(req.body.skip)
    .limit(req.body.limit)
    .sort(req.body.sort);
  try {
    res.status(200).json({ message: 'Overview', overview: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /nosql/get/count:
 *   get:
 *     description: Count rides, sum prices, groupby city
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/count/', auth, async (req, res) => {
  const result = await statistics.aggregate([
    {
      $group: {
        _id: '$city',
        count: { $sum: 1 },
        total: { $sum: '$price' },
      },
    },
    // {
    //   $addFields: {
    //     isNumber: { $isNumber: '$total' },
    //     hasType: { $type: '$total' },
    //   },
    // },
    { $sort: { count: req.body.sort } },
    { $skip: req.body.offset },
    { $limit: req.body.limit },
  ]);
  try {
    res.status(200).json({ message: 'Count rides, sum prices, groupby city', result: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export router
module.exports = router;
