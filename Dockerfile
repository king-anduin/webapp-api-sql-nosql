# base for our image, based on buildpack-deps, based on Debian Linux
FROM node:lts

# Create app directory
WORKDIR /srv/web-app

# Install app dependencies
COPY package.json ./

RUN npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3005
# Run this app when a container is launched
CMD [ "node", "-r", "routes/index.js" ]