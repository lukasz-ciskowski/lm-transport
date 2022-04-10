FROM node:16

RUN npm install -g nodemon

USER node

RUN mkdir -p /home/node/ui

WORKDIR /home/node/ui

COPY package*.json ./

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .
