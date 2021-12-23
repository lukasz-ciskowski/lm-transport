FROM node:16

USER node

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]