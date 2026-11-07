FROM node:22-alpine

LABEL org.opencontainers.image.source="https://github.com/rexwithluv/mongo-verba"

WORKDIR /app

COPY package*.json ./

# Install production deps, then remove npm and corepack: they are not needed
# at runtime and only add attack surface.
RUN apk upgrade --no-cache \
  && npm ci --omit=dev \
  && npm cache clean --force \
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

COPY . .

USER node

# Run node directly so SIGTERM reaches the app and the pod stops quickly.
CMD [ "node", "server.js" ]
