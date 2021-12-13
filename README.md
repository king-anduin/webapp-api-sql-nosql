# What's this all about?
- This repo was created for people who are study or just want to take a look at some SQL & NoSQL API examples
- There's a `api-request-examples.json` where you can take a look at API request examples
- You need to download the data content before using the WebApp

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
- `user=admin`   
- `pw=${SUPERSECRET}` in dot.env.template   

## server-adresses local
http://localhost:3000 -> app   
http://localhost:3001 -> phpmyadmin (GUI MariaDB)   
http://localhost:8081/-> mongo-express (GUI MongoDB)     

## healthcheck
http://localhost:3000/healthcheck      

## OpenAPI -> Swagger-ui
http://localhost:3000/api-docs   

## SQL API routes
Sequelize creates all tables for you and checks them everytime the app gets restart.   

### GET routes 
http://localhost:3000/sql/get/client  
http://localhost:3000/sql/get/client/:id   
http://localhost:3000/sql/get/driver   
http://localhost:3000/sql/get/driver/:id   
http://localhost:3000/sql/get/ride   
http://localhost:3000/sql/get/ride/:id   
http://localhost:3000/sql/get/waypoint   
http://localhost:3000/sql/get/waypoint/:id   
http://localhost:3000/sql/get/amount   
http://localhost:3000/sql/get/count      

### POST routes 
http://localhost:3000/sql/post/client  
http://localhost:3000/sql/post/driver  
http://localhost:3000/sql/post/ride  
http://localhost:3000/sql/post/waypoint      

### DELETE routes
http://localhost:3000/sql/delete/client/:id  
http://localhost:3000/sql/delete/driver/:id  
http://localhost:3000/sql/delete/ride   
http://localhost:3000/sql/delete/waypoint/:id    

### PUT routes 
http://localhost:3000/sql/update/client/:id  
http://localhost:3000/sql/update/driver/:id  
http://localhost:3000/sql/update/ride/:id  
http://localhost:3000/sql/update/waypoint/:id   

### View Statistics
http://localhost:3000/sql/get/amount  
http://localhost:3000/sql/get/count  
http://localhost:3000/sql/get/statistics   

### View overview
http://localhost:3000/sql/get/overview   

## NoSQL API routes
If you wanna migrate your data to MongoDB in index.js is a migration line. Just comment it out and change path to your csv file in .env. That's it.   

### GET routes
http://localhost:3000/nosql/get/client  
http://localhost:3000/nosql/get/client/:_id  
http://localhost:3000/nosql/get/driver  
http://localhost:3000/nosql/get/driver/:_id  
http://localhost:3000/nosql/get/ride  
http://localhost:3000/nosql/get/ride/:_id  
http://localhost:3000/nosql/get/waypoint  
http://localhost:3000/nosql/get/waypoint/:_id  
http://localhost:3000/nosql/get/overview/  
http://localhost:3000/nosql/get/overview/:_id  
http://localhost:3000/nosql/get/count/     

### POST routes 
http://localhost:3000/nosql/post/client  
http://localhost:3000/nosql/post/driver   
http://localhost:3000/nosql/post/ride  
http://localhost:3000/nosql/post/waypoint    

### DELETE routes
http://localhost:3000/nosql/delete/client/:_id  
http://localhost:3000/nosql/delete/driver/:_id  
http://localhost:3000/nosql/delete/ride/:_id  
http://localhost:3000/nosql/delete/waypoint/:_id      

### PUT routes
http://localhost:3000/nosql/update/client/:_id  
http://localhost:3000/nosql/update/driver/:_id  
http://localhost:3000/nosql/update/ride/:_id  
http://localhost:3000/nosql/update/waypoint/:_id   

# Packages & explanation
- *dotenv*:
  - Another solution is using `dotenv` package. Dotenv loads environment variables from .env files into the process.env variable in Node.js   

- *react*:
  - Framework for building frontend   

- *mariadb*: 
  - Install the mariadb Connector using npm   

- *express*:
  - backend API framework   

- *axios*:
  - frontend sends requests to backend   

- *mongoose*:
  - ODM(Object-document-mapping) for mongo   

- *nodemon*:
  - dev-tool -> app restarts automatically after saving   

- *sequelize*:
  - ORM(Object-relational-mapping) for mariadb
