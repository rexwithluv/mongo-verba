
FROM node:22-alpine AS build

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/mongo-verba"

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache curl

RUN npm install --omit=dev

ARG VITE_ENABLE_INSERT_QUOTE=false

COPY . .

CMD [ "npm", "start" ]