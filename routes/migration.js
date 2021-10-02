const csvtojson = require('csvtojson');

//------------------------- scenario_uber_client ---------------------------//
csvtojson()
  .fromFile(
    '/Users/king-anduin/nextcloud/studying/scripts/ndbk/scenario_uber/scenario_uber_client.csv'
  )
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
//------------------------- scenario_uber_driver.csv ---------------------------//
csvtojson()
  .fromFile(
    '/Users/king-anduin/nextcloud/studying/scripts/ndbk/scenario_uber/scenario_uber_driver.csv'
  )
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

//------------------------- scenario_uber_ride.csv ---------------------------//
csvtojson()
  .fromFile(
    '/Users/king-anduin/nextcloud/studying/scripts/ndbk/scenario_uber/scenario_uber_ride.csv'
  )
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

//------------------------- scenario_uber_waypoint.csv ---------------------------//
csvtojson()
  .fromFile(
    '/Users/king-anduin/nextcloud/studying/scripts/ndbk/scenario_uber/scenario_uber_waypoint.csv'
  )
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
