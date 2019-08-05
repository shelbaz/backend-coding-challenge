import routes from './server/routes';
import express from "express";
import http from "http";
// import logger from "morgan";
import bodyParser from "body-parser";
import 'babel-polyfill';
var models = require("../src/server/models");
import seed from './server/seeders/seed'

const hostname = '127.0.0.1';
const port = 3000;
const app = express(); // setup express application
const server = http.createServer(app);

// app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

models.sequelize.sync({force: true}).then(function () {
  server.listen(port, hostname, () => {
    seed();
    console.log(`Server running at http://${hostname}:${port}/`);
  });    
});

