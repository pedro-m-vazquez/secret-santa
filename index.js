const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');

const db = require('./models');
const Players = db.Player;
const SecretSantas = db.SecretSantas;

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();

var playerRoutes = require('./routes/player-routes.js')

// Log requests to the console.
app.use(logger('dev'));

app.use(cors())

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use('/api', playerRoutes);

app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning of nothingness.',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;