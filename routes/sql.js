/* eslint-disable no-useless-catch */
const express = require('express');

const router = express.Router();

// Include Sequelize module.
const sequelize = require('sequelize');
const {
  client,
  driver,
  ride,
  waypoint,
  ride_list,
  getAmount,
  statistic,
} = require('./models-sequelize.js');
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
router.get('/get/client', async (req, res) => {
  let task = req.body;
  try {
    const result = await client.findAll(task);
    res.status(200).json(result);
  } catch (err) {
    throw err;
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
router.get('/get/client/:id', async (req, res) => {
  console.log(await getAmount());
  try {
    const result = await client.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    throw err;
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
router.post('/post/client', async (req, res) => {
  let task = new client({
    firstname: req.body.firstname,
    surname: req.body.surname,
    gender: req.body.gender,
    clientnumber: req.body.clientnumber,
  });
  try {
    const newClient = await task.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/delete/client:
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
router.delete('/delete/client/:id', async (req, res) => {
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
    await client.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Client succesfull deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
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
router.put('/update/client', async (req, res, next) => {
  await client
    .update(
      {
        firstname: req.body.firstname,
        surname: req.body.surname,
        gender: req.body.gender,
        clientnumber: req.body.clientnumber,
      },
      { where: { id: req.body.id } }
    )
    .then(function (rowsUpdated) {
      res.status(201).json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
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
router.get('/get/driver', async (req, res) => {
  let task = req.body;
  try {
    const result = await driver.findAll(task);
    res.status(200).json(result);
  } catch (err) {
    throw err;
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
router.get('/get/driver/:id', async (req, res) => {
  try {
    const result = await driver.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    throw err;
  }
});
/**
 * @swagger
 * /sql/post/driver:
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
router.post('/post/driver', async (req, res) => {
  let task = new driver({
    firstname: req.body.firstname,
    surname: req.body.surname,
    city: req.body.city,
    license_plate: req.body.license_plate,
    drivernumber: req.body.drivernumber,
  });
  try {
    const newDriver = await task.save();
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/delete/driver:
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
router.delete('/delete/driver/:id', async (req, res) => {
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
    await driver.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Driver succesfull deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * @swagger
 * /sql/update/driver:
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
router.put('/update/driver', async (req, res, next) => {
  await driver
    .update(
      {
        firstname: req.body.firstname,
        surname: req.body.surname,
        city: req.body.city,
        license_plate: req.body.license_plate,
        drivernumber: req.body.drivernumber,
      },
      { where: { id: req.body.id } }
    )
    .then(function (rowsUpdated) {
      res.status(201).json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
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
router.get('/get/ride', async (req, res) => {
  let task = req.body;
  try {
    const result = await ride.findAll(task);
    res.status(200).json(result);
  } catch (err) {
    throw err;
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
router.get('/get/ride/:id', async (req, res) => {
  try {
    const result = await ride.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    throw err;
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
router.delete('/delete/ride/', async (req, res) => {
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
      res.status(201).json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
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
router.get('/get/waypoint', async (req, res) => {
  let task = req.body;
  try {
    const result = await waypoint.findAll(task);
    res.status(200).json(result);
  } catch (err) {
    throw err;
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
router.get('/get/waypoint/:id', async (req, res) => {
  try {
    const result = await waypoint.findOne({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch (err) {
    throw err;
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
router.delete('/delete/waypoint/:id', async (req, res) => {
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
      res.status(201).json({ message: 'Rows updated ' + rowsUpdated });
    })
    .catch(next);
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
router.get('/get/overview', async (req, res) => {
  try {
    const result = await ride_list.findAll(req.body);
    res.status(200).json(result);
  } catch (err) {
    throw err;
  }
});
//---------------------------- GET statistics -------------------------//
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
router.get('/get/amount', async (req, res) => {
  try {
    const result = await statistic.findAll({
      attributes: ['city', [sequelize.fn('sum', sequelize.col('price')), 'total']],

      group: ['statistic.city'],

      raw: true,

      order: sequelize.literal('total DESC'),
    });
    res.status(200).json(result);
  } catch (err) {
    throw err;
  }
});

//-------------------------- GET COUNT(rides) -----------------------//
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
router.get('/get/count', async (req, res) => {
  try {
    const result = await statistic.findAll({
      attributes: ['city', [sequelize.fn('count', sequelize.col('id')), 'rides']],

      group: ['statistic.city'],

      raw: true,

      order: sequelize.literal('rides DESC'),
    });
    res.status(200).json(result);
  } catch (err) {
    throw err;
  }
});

// Export routes
module.exports = router;
