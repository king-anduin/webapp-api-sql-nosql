# WebApp API SQL & NoSQL  
---

## On this page

1. [What is this all about](#what-is-this-all-about)  
2. [AWS specific content and microservice Docker](#aws-specific-content-and-microservice-Docker) 
3. [Install and start app](#install-and-start-app)  
4. [API routes ](#api-routes) 

   4.1 [Die API nutzt basic authorization for protection](#die-API-nutzt-basic-authorization-for-protection)  
   4.2 [server-adresses local](#server-adresses-local)  
   4.3 [Healthcheck](#healthcheck)  
   4.4 [Swagger-ui](#swagger-ui)  
5. [SQL API routes](#sql-api-routes)  

   5.1 [GET routes](#get-routes)  
   5.2 [POST routes](#post-routes)  
   5.3 [DELETE routes](#delete-routes)  
   5.4 [PUT routes](#put-routes)  
6. [NoSQL API routes](#nosql-api-routes) 

   6.1 [GET routes](#get-routes)  
   6.2 [POST routes](#post-routes)  
   6.1 [DELETE routes](#delete-routes)  
   6.2 [PUT routes](#put-routes)  
7. [Packages and explanation](#packages-and-explanation) 
8. [License](#license)

---
## What is this all about?
- This repo was created for people who are study or just want to take a look at some SQL & NoSQL API examples
- There's a `api-request-examples.json` where you can take a look at API request examples
- You need to download the data content before using the WebApp

## AWS specific content and microservice Docker
- I hosted the WebApp on AWS therefore there's a `buildspec.yml` file for an **CodePipeline**
- Furthermore it was hosted in an **Elastic Beanstalk** so you may find `.ebextensions` interesting
- Additionally I hosted the WebApp on **Fargate**, so I created a Docker Container, you may take a glimpse at the `Dockerfile` and the `docker-compose.yml`
- You can checkout the *NoSQL* Docker Image on [Docker repository](https://hub.docker.com/repository/docker/kinganduin1987/webapp-api-nosql).


## Install and start app

1. start visual studio code 
2. create .env file and copy variables from dot.env.template 
3. click on NPM scripts 
4. click on install-app 
5. start docker-compose-dev 
6. start (for prod) or start-dev (for dev)
7. stop docker-compose 
8. close app terminal  
  
---
# API routes   

## Die API nutzt basic authorization for protection
- `user=admin`   
- `pw=${SUPERSECRET}` in dot.env.template   

## server-adresses local
http://localhost:3000 -> app   
http://localhost:3001 -> phpmyadmin (GUI MariaDB)   
http://localhost:8081 -> mongo-express (GUI MongoDB)     

## Healthcheck
http://localhost:3000/healthcheck      

## Swagger-ui
http://localhost:3000/api-docs   
  
---
# SQL API routes
Sequelize creates all tables for you and checks them everytime the app gets restart. Only Thing is you need to create the views for the *statistic* and the *overview*. You can find the necessary information in the `sql-view.sql`and `scenario_uber.sql`  

## GET routes 
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

## POST routes 
http://localhost:3000/sql/post/client  
http://localhost:3000/sql/post/driver  
http://localhost:3000/sql/post/ride  
http://localhost:3000/sql/post/waypoint      

## DELETE routes
http://localhost:3000/sql/delete/client/:id  
http://localhost:3000/sql/delete/driver/:id  
http://localhost:3000/sql/delete/ride   
http://localhost:3000/sql/delete/waypoint/:id    

## PUT routes 
http://localhost:3000/sql/update/client/:id  
http://localhost:3000/sql/update/driver/:id  
http://localhost:3000/sql/update/ride/:id  
http://localhost:3000/sql/update/waypoint/:id   

## View Statistics
http://localhost:3000/sql/get/amount  
http://localhost:3000/sql/get/count  
http://localhost:3000/sql/get/statistics   

## View overview
http://localhost:3000/sql/get/overview   
  
---
# NoSQL API routes
Migration is done automatically  

## GET routes
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

## POST routes 
http://localhost:3000/nosql/post/client  
http://localhost:3000/nosql/post/driver   
http://localhost:3000/nosql/post/ride  
http://localhost:3000/nosql/post/waypoint    

## DELETE routes
http://localhost:3000/nosql/delete/client/:_id  
http://localhost:3000/nosql/delete/driver/:_id  
http://localhost:3000/nosql/delete/ride/:_id  
http://localhost:3000/nosql/delete/waypoint/:_id      

## PUT routes
http://localhost:3000/nosql/update/client/:_id  
http://localhost:3000/nosql/update/driver/:_id  
http://localhost:3000/nosql/update/ride/:_id  
http://localhost:3000/nosql/update/waypoint/:_id   
  
---
# Packages and explanation
- **dotenv**:
  - *Another solution is using `dotenv` package. Dotenv loads environment variables from .env files into the process.env variable in Node.js*   

- **react**:
  - *Framework for building frontend*   

- **mariadb**: 
  - *Install the mariadb Connector using npm*   

- **express**:
  - *backend API framework*   

- **axios**:
  - *frontend sends requests to backend*   

- **mongoose**:
  - *ODM(Object-document-mapping) for mongo*   

- **nodemon**:
  - *dev-tool -> app restarts automatically after saving*   

- **sequelize**:
  - *ORM(Object-relational-mapping) for mariadb*  

---
# License

Shield: [![CC BY 4.0][cc-by-shield]][cc-by]

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
