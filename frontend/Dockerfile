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

# The unprivileged image lags behind on Alpine patches, so upgrade at build time.
USER root
RUN apk upgrade --no-cache
USER 101

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]