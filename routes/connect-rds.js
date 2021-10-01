// Use the MariaDB Node.js Connector
// var mariadb = require("mariadb");

// Const for env variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

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
const Sequelize = require('sequelize')

// Creating new Object of Sequelize
const sequelize = new Sequelize(
	MYSQL_DATABASE,
	DB_USER,
	DB_PWD, {
		// Explicitly specifying
		// mysql database
		dialect: 'mariadb',

		// By default host is 'localhost'		
		host: DB_HOST
	}
);

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = sequelize
