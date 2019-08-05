import routes from './server/routes';
import express from "express";
import http from "http";
import logger from "morgan";
import bodyParser from "body-parser";

const hostname = '127.0.0.1';
const port = 3000;
const app = express(); // setup express application
const server = http.createServer(app);

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});