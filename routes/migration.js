const csvtojson = require('csvtojson');
const { client, driver, ride, waypoint } = require('./schema-mongo.js');

//------------------------- scenario_uber_client ---------------------------//
async function getCollectionClient() {
  var getClientCount = await client.count();
  if (getClientCount == 0) {
    csvtojson()
      .fromFile(process.env.CLIENTPATH)
      .then((csvData) => {
        const mongodb = require('mongodb').MongoClient;

        // let url = "mongodb://username:password@localhost:27017/";
        let url = process.env.MONGO;

        mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
          if (err) throw err;
          client
            .db(process.env.MONGODBNAME)
            .collection(process.env.CLIENT)
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        });
      });
  } else {
    console.log(
      `Database ${process.env.CLIENT} already exists and has ${getClientCount} documents`
    );
  }
}
getCollectionClient();

//------------------------- scenario_uber_driver.csv ---------------------------//
async function getCollectionDriver() {
  var getDriverCount = await driver.count();
  if (getDriverCount == 0) {
    csvtojson()
      .fromFile(process.env.DRIVERPATH)
      .then((csvData) => {
        const mongodb = require('mongodb').MongoClient;

        // let url = "mongodb://username:password@localhost:27017/";
        let url = process.env.MONGO;

        mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
          if (err) throw err;
          client
            .db(process.env.MONGODBNAME)
            .collection(process.env.DRIVER)
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        });
      });
  } else {
    console.log(
      `Database ${process.env.DRIVER} already exists and has ${getDriverCount} documents`
    );
  }
}
getCollectionDriver();

//------------------------- scenario_uber_ride.csv ---------------------------//
async function getCollectionRide() {
  var getRideCount = await ride.count();
  if (getRideCount == 0) {
    csvtojson()
      .fromFile(process.env.RIDEPATH)
      .then((csvData) => {
        const mongodb = require('mongodb').MongoClient;

        // let url = "mongodb://username:password@localhost:27017/";
        let url = process.env.MONGO;

        mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
          if (err) throw err;
          client
            .db(process.env.MONGODBNAME)
            .collection(process.env.RIDE)
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        });
      });
  } else {
    console.log(`Database ${process.env.RIDE} already exists and has ${getRideCount} documents`);
  }
}
getCollectionRide();

//------------------------- scenario_uber_waypoint.csv ---------------------------//
async function getCollectionWaypoint() {
  var getWaypointCount = await waypoint.count();
  if (getWaypointCount == 0) {
    csvtojson()
      .fromFile(process.env.WAYPOINTPATH)
      .then((csvData) => {
        const mongodb = require('mongodb').MongoClient;

        // let url = "mongodb://username:password@localhost:27017/";
        let url = process.env.MONGO;

        mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
          if (err) throw err;
          client
            .db(process.env.MONGODBNAME)
            .collection(process.env.WAYPOINT)
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        });
      });
  } else {
    console.log(
      `Database ${process.env.WAYPOINT} already exists and has ${getWaypointCount} documents`
    );
  }
}
getCollectionWaypoint();

//------------------------- Change old id to new _id ----------------------//
async function updateIds() {
  var get_idClient = await client.find({});
  var getClientCount = await client.count();
  for (i = 1; i <= getClientCount; i++) {
    await ride.updateMany({ client_id: i }, { client_id: get_idClient[i - 1]._id });
    console.log(i, get_idClient[i - 1]._id);
  }
  console.log(getClientCount);
  var get_idDriver = await driver.find({});
  var getDriverCount = await driver.count();
  for (i = 1; i <= getDriverCount; i++) {
    await ride.updateMany({ driver_id: i }, { driver_id: get_idDriver[i - 1]._id });
    console.log(i, get_idDriver[i - 1]._id);
  }
  console.log(getDriverCount);
  var get_idRide = await ride.find({});
  var getRideCount = await ride.count();
  for (i = 1; i <= getRideCount; i++) {
    await waypoint.updateMany({ ride_id: i }, { ride_id: get_idRide[i - 1]._id });
    console.log(i, get_idRide[i - 1]._id);
  }
  console.log(getRideCount);
}

//------------------------- Check migration ----------------------//
async function checkIdMigration() {
  zero = 0;
  var getClientCount = await client.count();
  var getDriverCount = await driver.count();
  var getRideCount = await ride.count();
  var getWaypointCount = await waypoint.count();
  if (
    getClientCount === zero &&
    getDriverCount === zero &&
    getRideCount === zero &&
    getWaypointCount === zero
  ) {
    updateIds();
  }
}
checkIdMigration();
