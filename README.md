https://trello.com/b/CyVXyNH7/system-design-capstone


# Project Catwalk (System Design)
## About The Application
The backend for a pre-existing retail website.

### Built/Tested with
PostgreSQL
Node
Express
Docker
AWS EC2
New Relic
Loader.io
Redis

## Development Process
Created RESTful API endpoints
Connected to express server to PostgreSQL database
Seeded PostgreSQL database with 15 million+ records.
Tested performance, and created indices on select columns to optimize queries to reduce response time from ~10s (10,000 ms) to around 10ms.
Implemented Redis cache to reduce calls to the database.
Deployed the application using a microservice architecture where the server was dockerized if needed for horizontal scaling.

### Running the server locally
1. Git clone this repo
2. `npm install`
3. Create PostgreSQL database using commands located in the server/db/postgresSchema.sql file
4. Copy the CSV data into the database using the copy commands located in the server/controllers/index.js file
5. Start the server using `npm start`

### Running the server in an AWS EC2 instance
1. Git clone
2. `npm install`
4. Create a docker image from the root directory using the commands in the Makefile, and then push the image to Dockerhub
5. Start EC2 instance
6. Send CSV files from local machine to EC2 instance -> `scp -i sdc.pem [ABSOLUTE FILE NAME WITH PATH] [IP ADDRESS OF EC2 INSTANCE]:~/.`
7. Pull server image from Dockerhub and run it in the instance
8. Run same SQL commands to copy data into the PostgreSQL database
