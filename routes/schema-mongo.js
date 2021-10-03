const mongoose = require('mongoose');

// Client schema for querying
const clientSchema = mongoose.Schema(
  {
    id: Number,
    name: String,
    gender: String,
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
    id: Number,
    name: String,
    city: String,
    licence_plate: String,
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
    id: Number,
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
    id: Number,
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
