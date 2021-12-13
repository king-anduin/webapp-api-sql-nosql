# Install & start app

1. start visual studio code 
2. create .env file and copy variables from dot.env.template 
3. click on NPM scripts 
4. click on install-app 
5. start docker-compose-dev 
6. start (for prod) or start-dev (for dev)
   When exiting click 
7. stop docker-compose 
8. close app terminal

# API routes   

## Die API nutzt basic authorization for protection
user=admin <br>
pw=${SUPERSECRET} in dot.env.template   

## server-adresses local
localhost:3000 -> app
localhost:3001 -> phpmyadmin (GUI MariaDB)
localhost:8081/-> mongo-express (GUI MongoDB)   

## healthcheck
http://localhost:3000/healthcheck      

## OpenAPI -> Swagger-ui
localhost:3000/api-docs   

## SQL API routes
Sequelize creates all tables for you and checks them everytime the app gets restart.   

### GET routes 
localhost:3000/sql/get/client 
localhost:3000/sql/get/client/:id 
localhost:3000/sql/get/driver 
localhost:3000/sql/get/driver/:id 
localhost:3000/sql/get/ride 
localhost:3000/sql/get/ride/:id 
localhost:3000/sql/get/waypoint 
localhost:3000/sql/get/waypoint/:id 
localhost:3000/sql/get/amount 
localhost:3000/sql/get/count    

### POST routes 
localhost:3000/sql/post/client
localhost:3000/sql/post/driver
localhost:3000/sql/post/ride
localhost:3000/sql/post/waypoint    

### DELETE routes
localhost:3000/sql/delete/client/:id
localhost:3000/sql/delete/driver/:id
localhost:3000/sql/delete/ride 
localhost:3000/sql/delete/waypoint/:id    

### PUT routes 
localhost:3000/sql/update/client/:id 
localhost:3000/sql/update/driver/:id 
localhost:3000/sql/update/ride/:id 
localhost:3000/sql/update/waypoint/:id   

### View Statistics
localhost:3000/sql/get/amount
localhost:3000/sql/get/count
localhost:3000/sql/get/statistics   

### View overview
localhost:3000/sql/get/overview   

## NoSQL API routes
If you wanna migrate your data to MongoDB in index.js is a migration line. Just comment it out and change path to your csv file in .env. That's it.   

### GET routes
localhost:3000/nosql/get/client
localhost:3000/nosql/get/client/:_id
localhost:3000/nosql/get/driver
localhost:3000/nosql/get/driver/:_id
localhost:3000/nosql/get/ride
localhost:3000/nosql/get/ride/:_id
localhost:3000/nosql/get/waypoint
localhost:3000/nosql/get/waypoint/:_id
localhost:3000/nosql/get/overview/
localhost:3000/nosql/get/overview/:_id
localhost:3000/nosql/get/count/   

### POST routes 
localhost:3000/nosql/post/client
localhost:3000/nosql/post/driver 
localhost:3000/nosql/post/ride
localhost:3000/nosql/post/waypoint    

### DELETE routes
localhost:3000/nosql/delete/client/:_id
localhost:3000/nosql/delete/driver/:_id
localhost:3000/nosql/delete/ride/:_id
localhost:3000/nosql/delete/waypoint/:_id    

### PUT routes
localhost:3000/nosql/update/client/:_id
localhost:3000/nosql/update/driver/:_id
localhost:3000/nosql/update/ride/:_id
localhost:3000/nosql/update/waypoint/:_id   

# Packages & explanation
- dotenv:
  - Another solution is using `dotenv` package. Dotenv loads environment variables from .env files into the process.env variable in Node.js   

- react:
  - Framework for building frontend   

- mariadb: 
  - Install the mariadb Connector using npm   

- express:
  - backend API framework   

- axios:
  - frontend sends requests to backend   

- mongoose:
  - ODM(Object-document-mapping) for mongo   

- nodemon:
  - dev-tool -> app restarts automatically after saving   
  
- sequelize:
  - ORM(Object-relational-mapping) for mariadb
