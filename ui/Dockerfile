FROM node:16

RUN npm install -g nodemon

USER node

RUN mkdir -p /home/node/server

WORKDIR /home/node/server

COPY package*.json ./

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .
