/* eslint-disable no-useless-catch */
const express = require('express');

const router = express.Router();

// Include Sequelize module.
const sequelize = require('sequelize');
const { client, driver, ride, waypoint, ride_list, statistic } = require('./models-sequelize.js');

//---------------------- Basic authorization for API usage ----------------//
const basicAuth = require('express-basic-auth');
const auth = basicAuth({
  users: { admin: `${process.env.SUPERSECRET}` },
});
//------------------------------- CLIENT routes -------------------------------//
/**
 * @swagger
 * /sql/get/client:
 *   get:
 *     description: Get all client
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/client', auth, async (req, res) => {
  try {
    const result = await client.findAll(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/get/client/:id:
 *   get:
 *     description: Get one client
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/client/:id', auth, async (req, res) => {
  try {
    const result = await client.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/post/client:
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
  let task = new client({
    firstname: req.body.firstname,
    surname: req.body.surname,
    gender: req.body.gender,
  });
  try {
    const newClient = await task.save();
    const updateClient = newClient.get({ plain: true });
    await client.update(
      {
        clientnumber: `${req.body.firstname}_${req.body.surname}_${updateClient.id}`,
      },
      { where: { id: updateClient.id } }
    );
    const result = await client.findOne({ where: { id: updateClient.id } });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//DELETE
/**
 * @swagger
 * /sql/delete/client/:id:
 *   delete:
 *     description: Delete an Employee
 *     parameters:
 *     - id: id
 *       description: Delete an employee
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/client/:id', auth, async (req, res) => {
  const result = await ride.findAll({
    attributes: [`id`],
    where: { client_id: req.params.id },
    raw: true,
  });
  try {
    result.forEach(async (item) => {
      var id = Object.values(item);
      await waypoint.destroy({ where: { ride_id: id[0] } });
    });
    result.forEach(async (item) => {
      var id = Object.values(item);
      await ride.destroy({ where: { id: id[0] } });
    });
    const value = await client.findOne({ where: { id: req.params.id } });
    await client.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Client succesfully deleted', client: value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT
/**
 * @swagger
 * /sql/update/client:
 *   put:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: Create an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.put('/update/client/:id', auth, async (req, res) => {
  try {
    await client.update(
      {
        firstname: req.body.firstname,
        surname: req.body.surname,
        gender: req.body.gender,
        clientnumber: req.body.clientnumber,
      },
      { where: { id: req.params.id } }
    );
    const value = await client.findOne({ where: { id: req.params.id }, raw: true });
    res.status(201).json({ message: 'Client updated', client: value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//------------------------------- DRIVER routes -------------------------------//
/**
 * @swagger
 * /sql/get/driver:
 *   get:
 *     description: Get all driver
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/driver', auth, async (req, res) => {
  let task = req.body;
  try {
    const result = await driver.findAll(task);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/get/driver/:id:
 *   get:
 *     description: Get one driver
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/driver/:id', auth, async (req, res) => {
  try {
    const result = await driver.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/post/driver:
 *   post:
 *     description: Create a driver
 *     parameters:
 *     - name: Max Mustermann
 *       description: Create a driver
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.post('/post/driver', auth, async (req, res) => {
  let task = new driver({
    firstname: req.body.firstname,
    surname: req.body.surname,
    city: req.body.city,
    country: req.body.country,
    license_plate: req.body.license_plate,
  });
  try {
    const newDriver = await task.save();
    const updateDriver = newDriver.get({ plain: true });
    await driver.update(
      {
        drivernumber: `${req.body.firstname}_${req.body.surname}_${updateDriver.id}`,
      },
      { where: { id: updateDriver.id } }
    );
    const result = await driver.findOne({ where: { id: updateDriver.id } });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/delete/driver:
 *   delete:
 *     description: delete an driver
 *     parameters:
 *     - name: EmployeeName
 *       description: delete an new driver
 *       in: formData
 *       required: true
 *       type: Number
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/driver/:id', auth, async (req, res) => {
  const result = await ride.findAll({
    attributes: [`id`],
    where: { driver_id: req.params.id },
    raw: true,
  });
  try {
    result.forEach(async (item) => {
      var id = Object.values(item);
      await waypoint.destroy({ where: { ride_id: id[0] } });
    });
    result.forEach(async (item) => {
      var id = Object.values(item);
      await ride.destroy({ where: { id: id[0] } });
    });
    const value = await driver.findOne({ where: { id: req.params.id } });
    await driver.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Driver succesfully deleted', client: value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/update/driver:
 *   put:
 *     description: update an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: update an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.put('/update/driver/:id', auth, async (req, res) => {
  try {
    await driver.update(
      {
        firstname: req.body.firstname,
        surname: req.body.surname,
        city: req.body.city,
        license_plate: req.body.license_plate,
        drivernumber: req.body.drivernumber,
      },
      { where: { id: req.params.id } }
    );
    const value = await driver.findOne({ where: { id: req.params.id }, raw: true });
    res.status(201).json({ message: 'Driver updated', driver: value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//------------------------------- RIDE routes -------------------------------//
/**
 * @swagger
 * /sql/get/ride:
 *   get:
 *     description: Get all clients
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/ride', auth, async (req, res) => {
  try {
    const result = await ride.findAll(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/get/ride/:id:
 *   get:
 *     description: Get one ride
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/ride/:id', auth, async (req, res) => {
  try {
    const result = await ride.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/post/ride:
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
router.post('/post/ride', auth, async (req, res) => {
  let task = new ride({
    client_id: req.body.client_id,
    driver_id: req.body.driver_id,
    ride_date: req.body.ride_date,
    distance: req.body.distance,
    price: req.body.price,
  });
  try {
    const newRide = await task.save();
    res.status(201).json(newRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/delete/ride:
 *   delete:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: Create an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/ride/', auth, async (req, res) => {
  try {
    res.json({ message: 'You cannot simply delete rides' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/update/ride:
 *   put:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: Create an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.put('/update/ride/:id', auth, async (req, res) => {
  try {
    await ride.update(
      {
        client_id: req.body.client_id,
        driver_id: req.body.driver_id,
        ride_date: req.body.ride_date,
        distance: req.body.distance,
        price: req.body.price,
      },
      { where: { id: req.params.id } }
    );
    const value = await ride.findOne({ where: { id: req.params.id }, raw: true });
    res.status(201).json({ message: 'Ride updated', client: value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//------------------------------- WAYPOINT routes -------------------------------//
/**
 * @swagger
 * /sql/get/waypoint:
 *   get:
 *     description: Get all clients
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/waypoint', auth, async (req, res) => {
  try {
    const result = await waypoint.findAll(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/get/waypoint/:id:
 *   get:
 *     description: Get one waypoint
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/waypoint/:id', auth, async (req, res) => {
  try {
    const result = await waypoint.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/post/waypoint:
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
router.post('/post/waypoint', auth, async (req, res) => {
  let task = new waypoint({
    ride_id: req.body.ride_id,
    number: req.body.number,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  try {
    const newWaypoint = await task.save();
    res.status(201).json(newWaypoint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/delete/waypoint:
 *   delete:
 *     description: Create an Employee
 *     parameters:
 *     - name: EmployeeName
 *       description: Create an new employee
 *       in: formData
 *       required: true
 *       type: String
 *     responses:
 *       201:
 *         description: Created
 *
 */
router.delete('/delete/waypoint/:id', auth, async (req, res) => {
  try {
    await waypoint.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Waypoint succesfull deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/update/waypoint:
 *   put:
 *     description: Get all driver
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.put('/update/waypoint/:id', auth, async (req, res) => {
  try {
    await waypoint.update(
      {
        ride_id: req.body.ride_id,
        number: req.body.number,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      { where: { id: req.params.id } }
    );
    const value = await waypoint.findOne({ where: { id: req.params.id }, raw: true });
    res.status(201).json({ message: 'Waypoint updated', waypoint: value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//------------------------------- Quick Overview -------------------------//
/**
 * @swagger
 * /sql/get/client:
 *   get:
 *     description: Get all client
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/overview', auth, async (req, res) => {
  try {
    const result = await ride_list.findAll(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//---------------------------- GET statistics -------------------------//
/**
 * @swagger
 * /sql/get/amount:
 *   get:
 *     description: Get the amount of cash per city
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/amount', auth, async (req, res) => {
  try {
    const result = await statistic.findAll({
      attributes: ['city', [sequelize.fn('sum', sequelize.col('price')), 'total']],

      group: ['statistic.city'],

      raw: true,

      order: sequelize.literal('total DESC'),
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//-------------------------- GET COUNT(rides) -----------------------//
/**
 * @swagger
 * /sql/get/count:
 *   get:
 *     description: Get the count of rides per city
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/get/count', auth, async (req, res) => {
  try {
    const result = await statistic.findAll({
      attributes: ['city', [sequelize.fn('count', sequelize.col('id')), 'rides']],

      group: ['statistic.city'],

      raw: true,

      order: sequelize.literal('rides DESC'),
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//-------------------------- GET both statistic requests -----------------------//
/**
 * @swagger
 * /sql/get/statistics:
 *   get:
 *     description: Get the count and amount of rides per city
 *     responses:
 *       200:
 *         description: Success
 *
 */
 router.get('/get/statistics', auth, async (req, res) => {
  try {
    const result = await statistic.findAll({
      attributes: [
        'city',
        [sequelize.fn('count', sequelize.col('id')), 'rides'],
        [sequelize.fn('sum', sequelize.col('price')), 'total']
      ],

      group: ['statistic.city'],

      raw: true,

      order: sequelize.literal(`${req.body.sortby} ${req.body.order}`),

      limit: req.body.limit,

      offset: req.body.offset,

    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Export routes
module.exports = router;