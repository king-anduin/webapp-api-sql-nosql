# Install & start app

1. start visual studio code <br>
3. create .env file and copy variables from dot.env.template <br>
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

in progress <br>
<br>

# SQL API routes
Sequelize creates all tables for you and checks them everytime the app gets restart.
<br>
localhost:3005/sql/client <br>
localhost:3005/sql/driver <br>
localhost:3005/sql/ride <br>
localhost:3005/sql/waypoint <br>
<br> 
# NoSQL API routes <br>
If you wanna migrate your data to MongoDB in index.js is a migration line. Just comment it out and change path to your csv file in .env. That's it.
<br>
localhost:3005/nosql/client <br>
localhost:3005/nosql/driver <br>
localhost:3005/nosql/ride <br>
localhost:3005/nosql/waypoint <br>
<br>
<br>
each API takes in a JSON format an example as shown below <br>
sql.get("/client", async (req, res) => { <br>
  let task = { <br>
    attributes: ['colum-names'], <br>
    where: {id: 1} <br>
    }; <br>
    try { <br>
      const result = await client.findAll(task); <br>
      res.send(result); <br>
    } catch (err) { <br>
      throw err; <br>
    } <br>
});<br>
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
