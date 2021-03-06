const mongoose = require('mongoose');

// Client schema for querying
const clientSchema = mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
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
    _id: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    license_plate: { type: String, required: true, index: true },
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
    _id: { type: String, required: true, unique: true },
    client_id: { type: String, required: true, index: true },
    driver_id: { type: String, required: true, index: true },
    ride_date: { type: String, required: true },
    distance: { type: String, required: true },
    price: { type: String, required: true },
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
    _id: { type: String, required: true, unique: true },
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

// Statistics schema for querying
const statisticsSchema = mongoose.Schema(
  {
    driver_id: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    city: { type: String, required: true, index: true },
  },
  {
    collection: 'statistics',
  }
);
// Change schema to moder / interface
const statistics = mongoose.model('statistics', statisticsSchema);

// Overview schema for querying
const overviewSchema = mongoose.Schema(
  {
    ride_date: { type: String, required: true },
    distance: { type: Number, required: true },
    price: { type: Number, required: true },
    driver_id: { type: String, required: true, index: true },
    driver_firstname: { type: String, required: true },
    driver_surname: { type: String, required: true },
    city: { type: String, required: true },
    license_plate: { type: String, required: true, index: true },
    drivernumber: { type: String, required: true, index: true },
    client_id: { type: String, required: true, index: true },
    client_firstname: { type: String, required: true },
    client_surname: { type: String, required: true },
    clientnumber: { type: String, required: true, index: true },
  },
  {
    collection: 'overview',
  }
);
// Change schema to moder / interface
const overview = mongoose.model('overview', overviewSchema);

module.exports = { client, driver, ride, waypoint, statistics, overview };
