// server/index.js
// Dep for env variables
require('dotenv').config();
// Dep for API
const express = require('express');
const app = express();
// Connection to MariaDB
// App
const PORT = process.env.PORT;
// Dep path
const path = require('path');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../static/build')));

//------------------------------- MariaDB API -------------------------------//
// Import sql outes
const sqlRoute = require('./sql.js');

app.use('/sql', sqlRoute);

//------------------------------- Mongo API -------------------------------//
// Import nosql routes
const nosqlRoute = require('./nosql.js');
app.use('/nosql', nosqlRoute);

//------------------------------- Sequelize -------------------------------//
// Import the sequelize object on which
// we have defined model.
const sequelize = require('./connect-rds.js');

// Import the user model we have defined
const models = require('./models-sequelize.js');

// Create all the table defined using
// sequelize in Database

// Sync all models that are not
// already in the database
sequelize.sync(models);

// Force sync all models
// It will drop the table first
// and re-create it afterwards
//sequelize.sync({force:true});
//------------------------------- App listen on -------------------------------//
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
