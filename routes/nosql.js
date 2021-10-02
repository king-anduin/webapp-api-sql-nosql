/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

//------------------------------- Mongo routes -------------------------------//
// Connection to MongoDB
const mongoose = require('mongoose');
const mondodb = process.env.MONGODB;
const schema = require('./schema-mongo.js');
mongoose.connect(mondodb, () => console.log('connected to DB'));

// GET client
router.get('/client', (req, res) => {
  res.send('client');
});

// GET driver
router.get('/driver', (req, res) => {
  res.send('driver');
});

// GET ride
router.get('/ride', (req, res) => {
  res.send('ride');
});

// Get waypoint
router.get('/waypoint', (req, res) => {
  res.send('waypoint');
});

module.exports = router;
