const mongoose = require('mongoose');

// Client schema for querying
const clientSchema = mongoose.Schema(
  {
    field1: Number,
    firstname: String,
    surname: String,
    gender: String,
    clientnumber: String,
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
    field1: Number,
    firstname: String,
    surname: String,
    city: String,
    country: String,
    licence_plate: String,
    drivernumber: String,
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
    field1: Number,
    client_id: Number,
    driver_id: Number,
    ride_date: Date,
    distance: Number,
    price: Number,
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
    field1: Number,
    ride_id: Number,
    number: Number,
    latitude: Number,
    longtitude: Number,
  },
  {
    collection: 'waypoint',
  }
);
// Change schema to moder / interface
const waypoint = mongoose.model('waypoint', waypointSchema);

module.exports = { client, driver, ride, waypoint };
