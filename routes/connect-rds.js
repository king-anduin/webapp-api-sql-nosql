// Use the MariaDB Node.js Connector
// var mariadb = require("mariadb");

// Create a connection pool
/*var pool = mariadb.createPool({
     host: DB_HOST, 
     user: DB_USER, 
     password: DB_PWD,
     connectionLimit: 5,
     database: MYSQL_DATABASE
});

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});*/

// Include Sequelize module
const Sequelize = require('sequelize');

// Creating new Object of Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.DB_USER_SQL,
  process.env.DB_PWD_SQL,
  {
    // Explicitly specifying
    // mysql database
    dialect: 'mariadb',

    // By default host is 'localhost'
    host: process.env.DB_HOST,
  }
);

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = sequelize;
