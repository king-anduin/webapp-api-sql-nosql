const express = require("express");

const sql = express.Router();

const sequelize = require('./connect-rds.js');
const { client, driver, ride, waypoint } = require("./models-sequelize.js");
//------------------------------- MariaDB routes -------------------------------//
// GET
sql.get("/client", async (req, res) => {
  //let task = req.body;
  let task = {
    attributes: ['name'],
    where: {id: 1}};
    try {
      const result = await client.findAll(task);
      res.send(result);
    } catch (err) {
      throw err;
    }
});
// GET
sql.get("/driver", async (req, res) => {
  let task = req.body;
  let task = {
    attributes: ['id'],
    where: {id: 2}};
    try {
      const result = await driver.findAll(task);
      res.send(result);
    } catch (err) {
      throw err;
    }
});
// GET
sql.get("/ride", async (req, res) => {
  let task = req.body;
  let task = {
    attributes: ['id'],
    where: {id: 3}};
    try {
      const result = await ride.findAll(task);
      res.send(result);
    } catch (err) {
      throw err;
    }
});
// GET
sql.get("/waypoint", async (req, res) => {
  let task = req.body;
  let task = {
    attributes: ['id'],
    where: {id: 4}};
    try {
      const result = await waypoint.findAll(task);
      res.send(result);
    } catch (err) {
      throw err;
    }
});

module.exports = sql;