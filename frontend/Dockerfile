FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .

ARG VITE_ENVIRONMENT

ARG VITE_ENABLE_INSERT_QUOTE=false

RUN npm run build

FROM nginx:alpine

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/mongo-verba"

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]