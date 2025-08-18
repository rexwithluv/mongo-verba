# Mongo Verba

> [!WARNING]
> The `docker-compose.yaml` file may not currently work due to the migration to K8s. Additionally, if you want to deploy, the `frontend/vite.config.ts` and `frontend/src/stores/apiStore.ts` files must be edited with the corresponding URLs.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

**Mongo Verba** is a simple web application for **storing quotes**. It allows users to add quotes with an author and optional notes, providing a practical environment for experimenting with **MongoDB**. [Check out on my playground <3](https://rexwithluv.dev/mongo-verba)

## Getting started

1. Navigate to the project directory:

    ```bash
    cd mongo-verba
    ```

2. Start the application with Kubernetes:

    ```bash
    kubectl apply -f k8s/
    ```

## Future Enhancements

- Optimize for mobile devices.
- Add language switching options.
- Save and read quotes from a text file or a CSV.

## Known Issues

- None at the moment!!
