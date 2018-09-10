'use strict';

var express = require('express');
var router = express.Router();
var AdminController = require('../controllers/admin');
var AdminAuth = require('../middleware/admin');

router.post('/create', AdminAuth, AdminController.create);
router.post('/login', AdminController.login);
router.get('/', AdminAuth, AdminController.admins);
router.get('/seed', AdminController.seed);
module.exports = router;
//# sourceMappingURL=admin.js.map