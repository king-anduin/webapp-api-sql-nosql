const express = require("express");

const sql = express.Router();

const db = require('./connect-rds.js')
//------------------------------- MariaDB routes -------------------------------//
// GET
sql.get("/client", async (req, res) => {
    try {
      const result = await db.pool.query("select * from client");
      res.send(result);
    } catch (err) {
      throw err;
    }
});
// POST
sql.post('/client', async (req, res) => {
  let task = req.body;
  try {
    const result = await db.pool.query("insert into tasks (description) values (?)", [task.description]);
    res.send(result);
  } catch (err) {
      throw err;
  }
});
// UPDATE
sql.put('/client', async (req, res) => {
  let task = req.body;
  try {
    const result = await db.pool.query("update tasks set description = ?, completed = ? where id = ?", [task.description, task.completed, task.id]);
    res.send(result);
  } catch (err) {
      throw err;
  } 
});
// DELETE
sql.delete('/client', async (req, res) => {
  let id = req.query.id;
  try {
    const result = await db.pool.query("delete from tasks where id = ?", [id]);
    res.send(result);
  } catch (err) {
      throw err;
  } 
});

module.exports = sql;