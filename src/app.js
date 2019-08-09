import routes from './server/routes';
import express from "express";
import expressWinston from "express-winston";
import {logger} from './server/lib/logger'
import http from "http";
import 'ejs';
import sassMiddleware from 'node-sass-middleware';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const path = require('path');
var models = require("../src/server/models");
import seed from './server/seeders/seed'

const hostname = '127.0.0.1';
const port = normalizePort(process.env.PORT || 8080);
export const app = express(); // setup express application
const server = http.createServer(app);

app.use(expressWinston.logger(logger)); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


// Automatically create the database with the models
models.sequelize.sync({force: true}).then(function () {
  server.listen(port, hostname, () => {
    seed(); // seed the db with csv
    logger.log({
      level: 'info',
      message: `Server running at http://${hostname}:${port}/`
    });
  });    
});

server.on('error', onError);
server.on('listening', onListening);
app.use(expressWinston.errorLogger(logger));


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  logger.info({
    level: 'info',
    message: 'Listening on ' + bind
  });
}



