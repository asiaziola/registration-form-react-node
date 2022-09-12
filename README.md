# Registration form

Following application is a simple form which lets user register with first name, last name, email and event date. Application has been deployed on Heroku [https://brainhub-registration.herokuapp.com](https://brainhub-registration.herokuapp.com).

- [Technologies](#technologies)
- [Run tests](#run-tests)
- [Run application locally](#run-locally)
- [Api](#api)
- [Future plans](#future-plans)

## Technologies

**Server**

- NodeJS
- Typescript
- Express
- PostgreSQL
- Knex
- Jest
- Supertest

**Client**

- React
- Typescript
- React Router Dom
- React Testing Library

## Run locally

Create `.env` file in `server` folder, following environment variables must be provided:

```sh
PGUSER=USER_NAME
PGHOST=DB_HOST
PGPASSWORD=DB_PASSWORD
PGDATABASE=DB_NAME
PGPORT=DB_PORT
```

It is possible to run application locally on two ways:

### Run client application from server

1. Head to server folder

```sh
cd server
```

2. Build client application

```sh
yarn build:client
```

3. Start server

```sh
yarn start:dev
```

### Run server and client separately

1. Head to server folder

```sh
cd server
```

2. Install dependencies

```sh
yarn install
```

3. Start server

```sh
yarn start:dev
```

4. Go back to the project root and head to client folder

```sh
cd ..
```

```sh
cd client
```

5. Install dependencies

```sh
yarn install
```

6. Start application

```sh
yarn start
```

## Run tests

In order to run tests, head to server or client folder and run:

```sh
yarn test
```

As a POC, I've also added sample cypress tests (it's just an example which I believe shows the flow of tests not a full coverage). In order to run cypress tests run following commands:

1. Install dependencies

```sh
yarn install
```

2. Build client

```sh
cd server
```

```sh
yarn run build:client
```

3. Build server

```sh
yarn run build
```

4. Start server - Knex configuration is set to connect to sqlite database in memory

```sh
yarn start:cypress
```

5. Start cypress server - it will open Cypress dashboard where you can manage tests and see the results

```sh
yarn run cypres:open
```

## API

### User

1. **POST** `api/users`

Allows to register user.

Parameters:

- `firstName`
- `lastName`
- `email`
- `eventDate`

2. **GET** `api/users`
   Returns an array of all users.

## Future plans

1. Route with a list of users should be created on client side, based on data returned from `api/users` get endpoint.
2. More e2e cypress tests should be written to provide stability.
3. Github workflows should be added (install/build/unit tests/cypress tests).
