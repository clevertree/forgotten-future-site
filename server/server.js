const express = require('express');
const app = express();
const routes = require(__dirname + '/routes.js');
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register Routes
app.use('/', routes);

// Start
app.listen(3000, () => console.log('Example app listening on port 3000!'));
