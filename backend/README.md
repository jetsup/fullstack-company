# Express-API

## Description

This is a simple API built with ExpressJS. It has the following endpoints:

User Management:

-   POST `/api/v1/users/signup` - To register a user
-   GET `/api/v1/users/login` - To login a user

Employee Management:

-   GET `/api/v1/employees` - To get all employees
-   POST `/api/v1/employees` - To add an employee
-   GET `/api/v1/employees/:eid` - To get an employee by ID
-   PUT `/api/v1/employees/:eid` - To update an employee by ID
-   DELETE `/api/v1/employees/xxx` - To delete an employee by ID

## Prerequisites

-   [Node.js](https://nodejs.org/en/download/)
-   [MongoDB](https://www.mongodb.com/try/download/community)
-   [Postman](https://www.postman.com/downloads/)

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy the [`.env.example`](.env.example) file to `.env` and set the environment variables
4. Run `nodemon` to start the development server

## Usage

You can use [Postman](https://www.postman.com/downloads/) to test the API. The base URL is `http://localhost:PORT/api/v1/`. The PORT is the port number set in your [`.env`](.env#L1) file.

First time users should register a user by sending a POST request to `/users/signup` with the following payload:

```json
{
    "username": "someone",
    "email": "someone@example.com",
    "password": "password123"
}
```

After registering, you can login by sending a GET request to `/users/login` with the following payload:

```json
{
    "email": "someone@example.com",
    "password": "password123"
}
```

You will receive a token which you can use to access the other endpoints.

Set the token in the `Authorization` header, type `Bearer Token`.

### Employee Management - CRUD Operations

1.  To `CREATE` an employee, send a POST request to `/employees` with the following payload:

    ```json
    {
        "first_name": "Alice",
        "last_name": "Johnson",
        "email": "alice.johnson@example.com",
        "position": "Designer",
        "salary": 85000,
        "date_of_joining": "2023-08-10",
        "department": "Design"
    }
    ```

2.  To get(`READ`) all employees, send a GET request to `/employees`.

    -   To get an employee by ID, send a GET request to `/employees/:eid`. Replace `:eid` with the employee ID.

3.  To `UPDATE` an employee by ID, send a PUT request to `/employees/:eid`. Replace `:eid` with the employee ID. e.g.

    method: PUT
    url: http://localhost:PORT/api/v1/emp/employees/64c9e5a3d9f3c1a5c9b4e8a4

    ```json
    {
        "position": "Senior Designer",
        "salary": 95000
    }
    ```

4.  To `DELETE` an employee by ID, send a DELETE request to `/employees/:eid`. Replace `:eid` with the employee ID. e.g.

        method: DELETE
        url: http://localhost:PORT/api/v1/employees/64c9e5a3d9f3c1a5c9b4e8a4

## Author
