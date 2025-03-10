# Social-Network-API
## Description
This is a backend API for a social network, allowing users to create profiles, share thoughts, react to friends' posts, and manage friend lists dynamically. It's build with **Express**, **MongoDB**, and **Mongoose**, this project demonstrates NoSQL database management and API routing.


## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

For installation follow these steps:
- Git clone the repository
- Install the dependency with `npm install`
- Set up the database connection in `.env`
```sh
MONGODB_URI='mongodb://your_server_name:27017/your_db_name'
```
- *(Optional)* Seed the database with test data: `npm run seed`
- start the server in your terminal: `npm start`

## Usage


GET /api/users Get all users

POST /api/users Create a new user

GET /api/users/:id Get a single user by ID

PUT /api/users/:id Update a user

DELETE /api/users/:id Delete a user

POST /api/users/:userId/friends/:friendId Add a friend

DELETE /api/users/:userId/friends/:friendId Remove a friend

GET /api/thoughts Get all thoughts

POST /api/thoughts Create a thought

POST /api/thoughts/:thoughtId/reactions Add a reaction

Test the API using Insomnia.

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## 📜License

This application is covered under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

If your project has a lot of features, list them here.

## How to Contribute
🚀 Developed by [stephanuh](https://github.com/stephanuh)