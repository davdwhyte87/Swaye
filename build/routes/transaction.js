'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Transaction = require('../models/Transaction');
var TransactionController = require('../controllers/transaction');
var Auth = require('../middleware/auth');
var AdminAuth = require('../middleware/admin');

router.get('/:trans_id/uconfirm', Auth, TransactionController.uconfirm);
router.get('/:trans_id/aconfirm', AdminAuth, TransactionController.aconfirm);
router.get('/', Auth, TransactionController.trans);
router.get('/all', AdminAuth, TransactionController.atrans);
module.exports = router;
//# sourceMappingURL=transaction.js.map