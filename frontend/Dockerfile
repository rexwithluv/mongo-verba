FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_BASE_URL

ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]