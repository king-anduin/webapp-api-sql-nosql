// server/index.js
// Dep for env variables
require("dotenv").config()
// Dep for API
const express = require("express");
const app = express();
// Connection to MariaDB
// App port
const PORT = process.env.PORT;
// Dep path
const path = require('path');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../static/build')));

//------------------------------- MariaDB API -------------------------------//
// Import routes
const sqlRoute = require("./sql.js");

app.use("/sql", sqlRoute);

//------------------------------- Mongo API -------------------------------//
// Import routes
const nosqlRoute = require("./nosql.js");

app.use("/nosql", nosqlRoute);

//------------------------------- App listen on -------------------------------//
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});