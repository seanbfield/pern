# Environment variables

Create a .env file in the root folder of this project's API (i.e ./api/.env) with the following variables:

```
SERVER_PROTOCOL=http
SERVER_PORT=3001
SERVER_HOST=localhost

CLIENT_PROTOCOL=http
CLIENT_PORT=3000
CLIENT_HOST=localhost

JWT_KEY=something_private_and_long_enough_to_secure

GITHUB_CLIENT_ID=XXXXXXXXXXXXXXXXX
GITHUB_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXX

GOOGLE_CLIENT_ID=XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=XXXXXXXXXXX_XXXXXXXXXXXXXXXX

PG_USER=postgres
PG_PASSWORD=XXXXXXXXXXXXXX
PG_HOST=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
PG_PORT=5432
PG_NAME=postgres
```


# Task - create authentication with a PERN stack using Passport JS

| ✅ Done | 🟨 Work in progress | 🟥 Pending |
|---------|----------------------|--------------|

## Requirements:

- ✅ Express - API / backend

- ✅ Sequelize

- ✅ Postgres - db

- ✅ Passport JS - authentication

-	✅ Implement the following strategies:

	-	✅ GitHub

	- ✅ Google

- ✅ React - front end

	- ✅ Components:

		-	✅ Create login component (functional)

		- ✅ Create a register component (functional)

	- ✅ Create an api.js file to communicate with the back end


## Must be able to:

-	✅ Login (Google and Github)

-	✅ Register (Google and Github)

-	✅ Logout (Google and Github)

## Other tasks:

- ✅ Scalable code structure

	- ✅ Apply better coding practices

	- ✅ Abstract UI components

	- ✅ Abstract utility functions

	- ✅ Use environment variables for credentials and project constants

		- ✅ Frontend
		
		- ✅ Backend (ddbb)

- ✅ Clean and split styles

	- ✅Index

	- ✅Login

	- ✅Logout

	- ✅Register

- ✅ Finish CRUD implementation

	- ✅ Create

	- ✅ Read

	- ✅ Update

	- ✅ Delete

	- ✅ Api.js

	- ✅ Use api.js
