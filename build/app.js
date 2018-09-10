'use strict';

var express = require('express');
var app = express();
var user_route = require('./routes/user');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var admin_routes = require('./routes/admin');
var order_routes = require('./routes/order');
var menu_routes = require('./routes/menu');
var transactions_routes = require('./routes/transaction');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', user_route);
app.use('/admin', admin_routes);
app.use('/order', order_routes);
app.use('/menu', menu_routes);
app.use('/transaction', transactions_routes);
app.use(morgan('dev'));
module.exports = app;
//# sourceMappingURL=app.js.map