# Mongo Verba

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

**Mongo Verba** is a simple web application for **storing quotes**. It allows users to add quotes with an author and optional notes, providing a practical environment for experimenting with **MongoDB**.

## Getting started

### Development (using Docker)

1. Navigate to the project directory:

    ```bash
    cd mongo-verba
    ```

2. Set up the environment variables:

    ```bash
    nano docker-compose.yaml
    ```

3. Start the application with Docker:

    ```bash
    docker compose up -d --build
    ```

The frontend is available at `http://localhost:5173` and the backend API is available at `http://localhost:3000`. In development the password to insert quotes is `mongo-verba-dev`.

### Production (using Kubernetes)

1. Navigate to the project directory:

    ```bash
    cd mongo-verba
    ```

2. Setup the secrets. `admin-password-hash` is the hash of the password used to insert quotes and `session-secret` signs the session cookie:

    ```bash
    cp k8s/secrets.example.yaml k8s/secrets.yaml
    (cd backend && npm run hash-password)   # value for admin-password-hash
    openssl rand -base64 48                 # value for session-secret
    nano k8s/secrets.yaml
    ```

3. Edit the Ingress to use your domain:

    ```bash
    nano k8s/ingress.yaml
    ```

4. Start the application with Kubernetes:

    ```bash
    kubectl apply -f k8s/
    ```

The application will be available at `https://your-domain.com/mongo-verba`

Reading quotes is public. Inserting quotes (`POST /quotes`) and listing disabled ones (`GET /quotes?includeDisabled=true`) require logging in with the admin password: press `I` on the page.

## Scheduler (with Cron)

Using `cron`, it is possible to send daily notifications within a specific time range to a **ntfy.sh** topic. These notifications are pulled from this application's public API. More information can be found in the `./scheduler` directory.

## Future Enhancements

- Add language switching options.
- Save and read quotes from a text file or a CSV.

## Known Issues

- None at the moment!!
