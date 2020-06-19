# [APP NAME]

[APP NAME]

* [Installation](#installation)
* [Starting App](#starting-app)
* [Testing](#testing)
* [Docker](#docker)

## Installation

These instructions are for use without docker

* Clone the repository [https://github.com/${username}/${repository}.git](https://github.com/${username}/${repository}.git)
* Make sure that [Node.js](https://nodejs.org/) is installed.
* Install Node.js modules with `yarn` [YarnPKG](https://yarnpkg.com/):

```shell
yarn install
```

## Documentation

* The API documentation with Postman can be found [here](Insert Postman Documentation)

## Starting App

* To run the app, copy the file `.env.example` to `.env` and substitute the settings to match your development environment.
* Start the app with `yarn`:

```shell
yarn start
```

* Navigate to [localhost:3000](http://localhost:3000). Please note `3000` is the default port used, you can change this in `.env`.

## Testing

* Tests are written using the [Mocha](https://mochajs.org/) library.

* To run tests with `yarn` use:

```shell
yarn test
```

## Docker

### Using Docker Standalone - Compose (Recomended for local development)

* Copy the files `docker/secrets.env.example`, `docker/config.env.example` to `docker/secrets.env`, `docker/config.env` and substitute the settings to match your development environment.

```shell
docker-compose up -d
```

* see logs

```shell
docker-compose logs -f
```

* run tests

```shell
docker-compose run --rm ${docker container name} yarn test
```

* tear down

```shell
docker-compose down
```

## Visit App

* Navigate to [Insert App Link](https://${application-url}) or [http://localhost:3000](http://localhost:3000)(docker standalone)

## Tests

* There are ${n} test suites, with ${n^n} test cases. They can be found in tests/

## Stack

* Backend Language + Framework: Nodejs + Express
* Database:
* Testing Framework: Mocha
* Hosting Server:
* Container Platform: Docker
* Session Management:
* Authentication/Authorization:

## Extras
