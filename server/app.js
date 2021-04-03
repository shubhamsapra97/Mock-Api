const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./api/user/api/api');

let app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// cors
app.use(cors());

//API ROUTES 
app.use(routes);

module.exports = app;
