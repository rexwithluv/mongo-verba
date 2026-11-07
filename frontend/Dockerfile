FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json  ./

RUN npm ci

COPY . .

ARG VITE_ENVIRONMENT

ARG VITE_ENABLE_INSERT_QUOTE=true

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.31-alpine

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/mongo-verba"

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]