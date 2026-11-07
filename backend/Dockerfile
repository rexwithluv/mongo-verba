FROM node:22-alpine

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/mongo-verba"

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

ENV ENABLE_INSERT_QUOTE=true

COPY . .

USER node

CMD [ "npm", "start" ]
