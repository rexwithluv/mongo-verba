
FROM node:22-alpine AS build

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/mongo-verba"

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]