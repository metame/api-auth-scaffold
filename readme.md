# apiAuthScaffold

A scaffold for api authentication using express, jsonwebtoken, and monk (mongodb).

## Start server
Add your MongoDB server to `config.js`, default is `localhost:27017` (and start it `mongod` if you haven't already).

Install dependencies: `npm install`.

Fire up the API server: `npm start`.

## Testing
Install mocha: `npm install -g mocha`

Run tests: `npm test`.

## Dependencies
* express
* body-parser
* jsonwebtoken
* monk