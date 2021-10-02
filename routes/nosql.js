/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

//------------------------------- Mongo routes -------------------------------//
// Connection to MongoDB
const mongoose = require('mongoose');
const mondodb = process.env.MONGODB;
const schema = require('./schema-mongo.js');
mongoose.connect(mondodb, () => console.log('connected to DB'));

router.get('/client', (req, res) => {
  res.send('client');
});

router.get('/driver', (req, res) => {
  res.send('driver');
});

router.get('/ride', (req, res) => {
  res.send('ride');
});

router.get('/waypoint', (req, res) => {
  res.send('waypoint');
});

module.exports = router;
