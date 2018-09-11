'use strict';

var express = require('express');
var router = express.Router();
var Menu = require('../models/Menu');
var mongoose = require('mongoose');
var MenuController = require('../controllers/menu');
var AdminAuth = require('../middleware/admin');
var Auth = require('../middleware/auth');

router.post('/add', AdminAuth, MenuController.add);
//this gets all the menu items
router.get('/', Auth, MenuController.menu);
//updating a menu
router.patch('/:id', AdminAuth, MenuController.update);
router.delete('/:id', AdminAuth, MenuController.delete);
router.get('/:id/take/:take', Auth, MenuController.take);
router.get('/img/:name', MenuController.image);
module.exports = router;
//# sourceMappingURL=menu.js.map