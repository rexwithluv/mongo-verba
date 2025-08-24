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

The frontend is available at `http://localhost:2319` and the backend API is available at `http://localhost:3000`

### Production (using Kubernetes)

1. Navigate to the project directory:

    ```bash
    cd mongo-verba
    ```

2. Setup the secrets:

    ```bash
    cp k8s/secrets.example.yaml k8s/secrets.yaml
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

Note: It's possible to enable or disable quote insertion independently on both the frontend and the backend. By default, it comes disabled on the backend and frontend. Edit the Dockerfiles according to your preference.

## Future Enhancements

- Add language switching options.
- Save and read quotes from a text file or a CSV.

## Known Issues

- None at the moment!!
