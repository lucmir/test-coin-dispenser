# Test Coin Dispenser

[![Build Status](https://travis-ci.org/lucmir/test-coin-dispenser.svg?branch=master)](https://travis-ci.org/lucmir/test-coin-dispenser)

A (very) simple tool to distribute test coins (e.g. test Bitcoin).

Refer to the [project issues](https://github.com/lucmir/test-coin-dispenser/issues) for a list of known issues, feature requests and questions. Please, feel free to contribute with issues or PRs.


## Running Instructions


### Backend

Backend is an express application.

In order to run the backend application you will need to setup the required environment variables.
Create an `.env` file by just copying from the `.env.example` file and set the values for the variables defined there.

The following commands will start the application:
```
$ cd src/backend
$ npm install
$ npm run start
```

