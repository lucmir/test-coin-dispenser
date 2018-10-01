# Test Coin Dispenser

[![Build Status](https://travis-ci.org/lucmir/test-coin-dispenser.svg?branch=master)](https://travis-ci.org/lucmir/test-coin-dispenser)

A (very) simple tool to distribute test coins (e.g. test Bitcoin).

Refer to the [project issues](https://github.com/lucmir/test-coin-dispenser/issues) for a list of known issues, feature requests and questions. Please, feel free to contribute with issues or PRs.


## Running Instructions


### Backend

Backend is an express application.

In order to run the backend application you will need to setup the required environment variables.
Create an `.env` file on `/src/backend` by just copying from the `.env.example` file and set the values for the variables defined there.

The following commands will start the application:
```
$ cd src/backend
$ npm install
$ npm run start
```

With the application running, the API documentation will be available on `http://localhost:3000/` or `http:localhost:3000/api-docs`.

### Client application

Client is a simple React application.

In order to run the client application you will need to setup the required environment variables.
Create an `.env` file on `/src/client` by just copying from the `.env.example` file and set the values for the variables defined there.

The following commands will start the application:
```
$ cd src/client
$ npm install
$ npm run start
```

A web page will automatically open with the application page.


### Running with Docker

Alternatively, the application can be executed with Docker. Before running, it is necessary to set the environment variables on `/src/client/.env` and `/src/backend/.env` (see `/src/client/.env.example` and `/src/backend/.env.example`) or you can set the values directly in the `docker-compose.yml` file.

The following command will build and run the application (backend and client app).
```
$ docker-compose build
$ docker-compose up
```
The backend application will be exposed on *http://localhost:3000*. Client app will be available on *http://localhost*.


## Testing

You can run all tests for the backend or client application by running `npm run test` from `src/backend` or `src/client`.

There are also a command for *lint checking* on `src/backend`: `npm run lint`.
