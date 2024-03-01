# db-migrator

This project holds the data model for a backend cockroach db.

## Environment Variables
DATABASE_URL: Url used to connect to the cockroach db instance

## How to use
1. Edit code
2. Run `npm i`
3. Run `node app.js <ENV>` where `local` will attempt to connect to a local database and `prod` will use the environment variable