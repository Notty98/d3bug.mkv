# Geo-referenced Photo Management System - Context-Aware Systems 2022/2023

This is the repository of Context-Aware Systems project.

The application allows the user to upload photos geo-tagged with the position using the frontend or the mobile app. 

Furthermore, the frontend implements features based on user position and the mobile app shows the nearest photos to the user's location.

## Prerequisites

The application can be run both on kubernetes and the local machine. So the prerequisite depends on the environment where the applicaion is run.

### Local deployment

* Node.js: node v16.10.0 (nvm - https://github.com/coreybutler/nvm-windows)
* PgAdmin (optional): https://www.pgadmin.org/
* PostgreSQL: https://www.postgresql.org/download/windows/
* Postgis Extension: http://postgis.net/documentation/getting_started/install_windows/

### Deployment in kubernetes

* Docker: https://www.docker.com/
* minikube: https://minikube.sigs.k8s.io/docs/

## Execute the application on Kubernetes

First, it is necessary to check if the configuration file of backend and frontend are set to the production environment, so:

- backend: check if in the file `backend\.env` the parameters of database connection are selected the productions ones
- frontend: check if in the file `frontend\src\services\sercices.js` the selected url is the production one
- app: check if the current address is the one of the machine where the application is deployed

To run the application on kubernetes is necessary to build the image of frontend and backend.
To do this, move to the root directory of the project `cd d3bug.mkv` and then:

- move to the backend (`cd backend`) folder and run the following commands
```
docker build -t thenotty/backend .
docker push thenotty/backend
```

- move to the frontend (`cd frontend`) folder and run the following commands
```
docker build -t thenotty/frontend .
docker push thenotty/frontend
```

Finally, in the root of the project run `./deploy.bat`.

## Execute the application on local machine

First, it is necessary to run a `npm install` in the frontend and backend directory.

After that, it is necessary to check if the configuration file of backend and frontend are set to the dev environment, so:

- backend: check if in the file `backend/.env` the parameters of database connection are selected the dev ones
- frontend: check if in the file `frontend\src\services\sercices.js` the selected url is the dev one
- app: check if the current address is the one of the machine where the application is executed

Finally, run `npm run serve` both in the frontend and backend directory

# Authors

Giuseppe Massimo

Stefano Notari