# base for our image, based on buildpack-deps, based on Debian Linux
FROM node:14-alpine

# Create app directory
RUN mkdir /home/web-app

# give app directory node user rights
RUN chown -R node:node /home/web-app

# working directory for the app
WORKDIR /home/web-app

# copy package.json to workdir in order to install dependencies
COPY --chown=node:node package*.json ./

# If you are building your code for production
RUN npm ci --only=production && npm audit fix

# copy everything from host to docker workdir
COPY . ./

# build frontend
RUN npm run build

# ENV variables
ENV NODE_ENV ${NODE_ENV}
ENV BASIC_AUTH_PW ${BASIC_AUTH_PW}
ENV PORT ${PORT}

# SQL variables
ENV DB_HOST ${DB_HOST}
ENV DB_USER_SQL ${DB_USER_SQL}
ENV DB_PWD_SQL ${DB_PWD_SQL}
ENV MYSQL_DATABASE ${MYSQL_DATABASE}

# Mongo variables
ENV MONGODB ${MONGODB}
ENV MONGO ${MONGO}
ENV MONGODBNAME ${MONGODBNAME}

# Files to import
ENV CLIENT=client
ENV CLIENTPATH=./data/client_uber.csv
ENV RIDE=ride
ENV RIDEPATH=./data/scenario_uber_ride.csv
ENV WAYPOINT=waypoint
ENV WAYPOINTPATH=./data/scenario_uber_waypoint.csv
ENV DRIVER=driver
ENV DRIVERPATH=./data/driver_uber.csv  

# expose port
EXPOSE ${PORT}

# add curl to the image in order to conduct a healthcheck
RUN apk --no-cache add curl

# change user to node instead of root for security purposes
USER node

# gives back healthchek 200 when working
HEALTHCHECK CMD curl -f http://admin:${BASIC_AUTH_PW}@localhost:3000/healthcheck || exit 1

# Run this app when a container is launched
CMD [ "npm", "start" ]