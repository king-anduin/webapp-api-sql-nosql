/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
const express = require('express');

const router = express.Router();

const { client, driver, ride, waypoint } = require('./models-sequelize.js');
//------------------------------- MariaDB routes -------------------------------//
// GET
router.get('/client', async (req, res) => {
  let task = req.body;
  try {
    const result = await client.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});
// GET
router.get('/driver', async (req, res) => {
  let task = req.body;
  try {
    const result = await driver.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});
// GET
router.get('/ride', async (req, res) => {
  let task = req.body;
  try {
    const result = await ride.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});
// GET
router.get('/waypoint', async (req, res) => {
  let task = req.body;
  try {
    const result = await waypoint.findAll(task);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
