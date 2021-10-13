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

//---------------------- Basic authorization for API usage ----------------//
const basicAuth = require('express-basic-auth');

app.use(
  basicAuth({
    users: { admin: `${process.env.SUPERSECRET}` },
  })
);
//------------------------------- Load react frontend -----------------------//
// express can use JSON format. It's the same as body-parser but thats not part of it anymore
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../static/build')));

//------------------------------- MariaDB API -------------------------------//
// Import sql routes
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

//---------------------------- Migration to Mongo -------------------------//
// Migration data to MongoDB
const migration = require('./migration.js');
migration;

//------------------------------- Twitter API -------------------------------//
/*const twitter = require('./twitter.js');
twitter;*/
//------------------------------- SWAGGER (OpenAPI) -------------------------------//
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Uber API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//------------------------------- App listen on -------------------------------//
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
