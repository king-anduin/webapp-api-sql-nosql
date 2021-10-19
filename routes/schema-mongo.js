const mongoose = require('mongoose');

// Client schema for querying
const clientSchema = mongoose.Schema(
  {
    field1: { type: Number, required: false, unique: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    gender: { type: String, required: true },
    clientnumber: { type: String, unique: true },
  },
  {
    collection: 'client',
  }
);
// Change schema to moder / interface
const client = mongoose.model('client', clientSchema);

// Driver schema for querying
const driverSchema = mongoose.Schema(
  {
    field1: { type: Number, required: false, unique: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    licence_plate: { type: String, required: true, index: true },
    drivernumber: { type: String, unique: true },
  },
  {
    collection: 'driver',
  }
);
// Change schema to moder / interface
const driver = mongoose.model('driver', driverSchema);

// Ride schema for querying
const rideSchema = mongoose.Schema(
  {
    id: { type: Number, required: false, index: true },
    client_id: { type: String, required: true, index: true },
    driver_id: { type: String, required: true, index: true },
    ride_date: { type: Date, required: true },
    distance: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    collection: 'ride',
  }
);
// Change schema to moder / interface
const ride = mongoose.model('ride', rideSchema);

// Waypoint schema for querying
const waypointSchema = mongoose.Schema(
  {
    id: { type: Number, required: false, index: true },
    ride_id: { type: String, required: true, index: true },
    number: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longtitude: { type: Number, required: true },
  },
  {
    collection: 'waypoint',
  }
);
// Change schema to moder / interface
const waypoint = mongoose.model('waypoint', waypointSchema);

module.exports = { client, driver, ride, waypoint };
