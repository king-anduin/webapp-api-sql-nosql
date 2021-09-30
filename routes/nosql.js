const express = require("express");

const router = express.Router();

//------------------------------- Mongo routes -------------------------------//
// Connection to MongoDB
const mongoose = require('mongoose');
const mondodb = process.env.MONGODB;
mongoose.connect(mondodb, () =>
  console.log("connected to DB")
);

router.get("/client", (req, res) => {
    res.send("works");
  });

module.exports = router;