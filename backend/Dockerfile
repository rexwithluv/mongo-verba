
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]