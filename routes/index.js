// server/index.js
require("dotenv").config()

const express = require("express");
const db = require('./sql.js')
const bodyParser = require("body-parser");
const fs = require("fs");

const PORT = process.env.PORT;

const app = express();

// server/index.js
const path = require('path');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../static/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Backend works!" });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// GET
app.get("/client", async (req, res) => {
    try {
        const result = await db.pool.query("select * from client");
        res.send(result);
    } catch (err) {
        throw err;
    }
});
// POST
app.post('/client', async (req, res) => {
  let task = req.body;
  try {
      const result = await db.pool.query("insert into tasks (description) values (?)", [task.description]);
      res.send(result);
  } catch (err) {
      throw err;
  }
});
// UPDATE
app.put('/client', async (req, res) => {
  let task = req.body;
  try {
      const result = await db.pool.query("update tasks set description = ?, completed = ? where id = ?", [task.description, task.completed, task.id]);
      res.send(result);
  } catch (err) {
      throw err;
  } 
});
// DELETE
app.delete('/client', async (req, res) => {
  let id = req.query.id;
  try {
      const result = await db.pool.query("delete from tasks where id = ?", [id]);
      res.send(result);
  } catch (err) {
      throw err;
  } 
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

