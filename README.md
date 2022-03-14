# expert-institute-project
 Technical 3-day Interview Project - Cocktail Bar
 By: Tennie Jacobson
 Date: 03/14/2022
## Features
- Node.JS and Express were chosen for back-end API
- lowdb was used for DB simulation with a db.json file
- Swagger was used for testbed and presentation
- ECMAScript Language ES6 module system used

## Summary
This project was a first attempt at learning Node.JS and Express to assess my skills at learning and problem solving.

## How To Run
####  Prerequisites
Should have updated versions of npm and [node.js](https://nodejs.org/) installed on computer, If not, follow instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Also note that Python and Visual Studio Build is required.
1. Pull down the GIT repository
2. Open terminal and navigate to project folder at the root
3. run `npm install` to pull in dependencies
4. run `npm start` to launch the index.js file and start the server on port 8080 or at your environment's dedicated port
5. Open favorite browser and type in `http://localhost:8080/api-docs/` or at your environment's dedicated port
6. For testing, use Swagger examples and data found in https://www.thecocktaildb.com/api.php
7. NOTE: If swagger says there are too many requests, do Ctrl+c in terminal and restart the server.

## Future and Fixing
A lot more could be done with this 3-day project. Security could be improved (web-tokens, user access, etc.). There is missing functionaility for the pagination. Other CRUD and filtering requests are functional, but could use better management with Models and route controllers. Biggest thing is the database being a json file within the project - that should definitely change.