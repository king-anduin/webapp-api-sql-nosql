# Install & start app

1. start visual studio code <br>
2. create .env file and copy variables from dot.env.template <br>
3. click on NPM scripts <br>
4. click on install-app <br>
5. start docker-compose <br>
6. start (for prod) or start-dev (for dev)<br>
   <br>
   When exiting click <br>
7. stop docker-compose <br>
8. close app terminal <br>
   <br>

# server-adresses local

localhost:3005 -> app <br>
localhost:3001 -> phpmyadmin (GUI MariaDB) <br>
localhost:8081/-> mongo-express (GUI MongoDB) <br>
<br>

# server-adresses cloud aws

https://api.king-anduin.com <br>
https://gui.king-anduin.com/phpmyadmin <br>
https://api.king-anduin.com/mongo-express <br>
<br>

# OpenAPI -> Swagger-ui

localhost:3005/api-docs <br>
https://api.king-anduin.com/api-docs/ <br>

# Die API nutzt basic authorization for protection

user=admin <br>
pw=${SUPERSECRET} in dot.env.template <br>

# SQL API routes

Sequelize creates all tables for you and checks them everytime the app gets restart.
<br>
GET routes <br>
localhost:3005/sql/get/client <br>
localhost:3005/sql/get/client/:id <br>
localhost:3005/sql/get/driver <br>
localhost:3005/sql/get/driver/:id <br>
localhost:3005/sql/get/ride <br>
localhost:3005/sql/get/ride/:id <br>
localhost:3005/sql/get/waypoint <br>
localhost:3005/sql/get/waypoint/:id <br>
localhost:3005/sql/get/amount <br>
localhost:3005/sql/get/count <br>
<br>
POST routes <br>
localhost:3005/sql/post/client <br>
localhost:3005/sql/post/driver <br>
localhost:3005/sql/post/ride <br>
localhost:3005/sql/post/waypoint <br>
<br>
DELETE routes <br>
localhost:3005/sql/delete/client/:id <br>
localhost:3005/sql/delete/driver/:id <br>
localhost:3005/sql/delete/ride <br>
localhost:3005/sql/delete/waypoint/:id <br>
<br>
PUT routes <br>
localhost:3005/sql/update/client/:id <br>
localhost:3005/sql/update/driver/:id <br>
localhost:3005/sql/update/ride/:id <br>
localhost:3005/sql/update/waypoint/:id <br>
<br>

# Statistics

localhost:3005/sql/get/amount <br>
localhost:3005/sql/get/count <br>
localhost:3005/sql/get/statistics <br>
<br>

# View ride_list

localhost:3005/sql/get/overview <br>
<br>

# NoSQL API routes <br>

If you wanna migrate your data to MongoDB in index.js is a migration line. Just comment it out and change path to your csv file in .env. That's it.
<br>
GET routes <br>
localhost:3005/nosql/get/client <br>
localhost:3005/nosql/get/client/:_id <br>
localhost:3005/nosql/get/driver <br>
localhost:3005/nosql/get/driver/:_id <br>
localhost:3005/nosql/get/ride <br>
localhost:3005/nosql/get/ride/:_id <br>
localhost:3005/nosql/get/waypoint <br>
localhost:3005/nosql/get/waypoint/:_id <br>
localhost:3005/nosql/get/overview/ <br>
localhost:3005/nosql/get/overview/:_id <br>
localhost:3005/nosql/get/count/ <br>
<br>
POST routes <br>
localhost:3005/nosql/post/client <br>
localhost:3005/nosql/post/driver <br>
localhost:3005/nosql/post/ride <br>
localhost:3005/nosql/post/waypoint <br>
<br>
DELETE routes <br>
localhost:3005/nosql/delete/client/:\_id <br>
localhost:3005/nosql/delete/driver/:\_id <br>
localhost:3005/nosql/delete/ride/:\_id <br>
localhost:3005/nosql/delete/waypoint/:\_id <br>
<br>
PUT routes <br>
localhost:3005/nosql/update/client/:\_id <br>
localhost:3005/nosql/update/driver/:\_id <br>
localhost:3005/nosql/update/ride/:\_id <br>
localhost:3005/nosql/update/waypoint/:\_id <br>
<br>

# Packages & explanation

- dotenv: <br>
  Another solution is using `dotenv` package. Dotenv loads environment variables from .env files into the process.env variable in Node.js<br>
  <br>
- react <br>
  Framework for building frontend
  <br>
- mariadb <br>
  Install the mariadb Connector using npm
  <br>
- express <br>
  backend API framework
  <br>
- axios <br>
  send requests to backend
  <br>
- mongoose <br>
  NoSQL connector
  <br>
- nodemon <br>
  dev-tool -> app restarts automatically after saving
  <br>
- sequelize <br>
  ORM(Object-relational-mapping) tool for node
