## Setup

**Note:** For this exercise, we have provided an `.env` file with the database connection string. Normally, you would not commit this file to version control. We are doing it here for simplicity and given that we are using a local SQLite database.

## Database

This project should be used with the `movies.db` database in `data/` folder. It is the same database that we used in the previous exercise. You can download a fresh database [here](https://cdn.cs50.net/2022/fall/psets/7/movies.zip) or from [CS50](https://cs50.harvard.edu/x/2023/psets/7/movies/).

## Migrations

We can run migrations with the following command:

```bash
npm run migrate:latest
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```

## Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash
npm run generate-types
```

## TODO LIST:

### Create table screening

id: numeric primary key <br>
timestamp: datetime <br>
total_tickets: numeric, positive <br>
tickets_left: numeric, positive, <= total_tickets <br>
movie_id: foreign key for movies.id <br>

### Write tests for screening endpoint

- it should find all screenings where tickets_left > 0;

### Write tests for ticket

- it should get a list of all bookings made;
