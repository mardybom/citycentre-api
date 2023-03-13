# City Centre API

This is a NestJS application that requires some additional setup before it can be run. Please follow the instructions below to set up and run the application.

## Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory in your terminal.
3.  Run `npm install` to install all required dependencies.

## Setting up the Environment

Before running the application, you need to set up the environment variables.

1.  In the project directory, create a new file called `.env`.
2.  In the `.env` file, define the following environment variables:
    - `PORT` - the port to which the server is listening
    - `DATABASE_HOSTNAME` - the hostname of the PostgreSQL database
    - `DATABASE_PORT` - the port of the PostgreSQL database
    - `DATABASE_USERNAME` - the username of the PostgreSQL database
    - `DATABASE_PASSWORD` - the password of the PostgreSQL database
    - `DATABASE_NAME` - the name of the PostgreSQL database
    - `SECRETKEY` - the secret used to sign JWT tokens
    - `EXPIRESIN` - the expiration time (in seconds) for JWT tokens

Example `.env` file:

    PORT=8080

    DATABASE_HOSTNAME=localhost
    DATABASE_PORT=5445
    DATABASE_USERNAME=citycentre
    DATABASE_PASSWORD=password
    DATABASE_NAME=citycentre

    SECRETKEY=secretkey
    EXPIRESIN=12h

## Starting the Database

Before running the application, you need to start the PostgreSQL database container.

1.  In your terminal, navigate to the project directory.
2.  Run `npm run run:services` to start the Docker container with PostgreSQL.

## Database Migration

Once the database container is running, you can migrate the database schema.

1.  In your terminal, navigate to the project directory.
2.  Run `npm run migrate` to run the database migration.

## Running the Application

To run the application:

1.  In your terminal, navigate to the project directory.
2.  Run `npm start` to start the application.

By default, the application will use the following credentials for authentication:

- Username: <jon@email.com>
- Password: password

Please note that these credentials should be changed in a production environment for security reasons.

## Conclusion

Following the instructions in this readme should enable you to successfully set up and run this NestJS application. If you have any issues or questions, please don't hesitate to contact the developer.
