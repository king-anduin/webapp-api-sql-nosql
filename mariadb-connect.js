const mariadb = require('mariadb');
  require('dotenv').config()
  mariadb.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PWD})
    .then(conn => {
       pass
     });