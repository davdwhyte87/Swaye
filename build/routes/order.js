'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order');
var OrderController = require('../controllers/order');
var Auth = require('../middleware/auth');
var AdminAuth = require('../middleware/admin');

//an authenticated user can create a transaction
router.post('/create', Auth, OrderController.create);
//confirm a transaction by the admin
router.get('/:id/confirm', AdminAuth, OrderController.confirm);
module.exports = router;
//# sourceMappingURL=order.js.map