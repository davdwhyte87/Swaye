var express=require('express')
var router=express.Router()
var Menu=require('../models/Menu')
var mongoose=require('mongoose')
const MenuController=require('../controllers/menu')
const AdminAuth=require('../middleware/admin')
const Auth=require('../middleware/auth')

router.post('/add',AdminAuth,MenuController.add)
//this gets all the menu items
router.get('/',Auth,MenuController.menu)
router.get('/:id',Auth,MenuController.menu_single)
//updating a menu
router.patch('/:id',AdminAuth,MenuController.update)
router.delete('/:id',AdminAuth,MenuController.delete)
router.get('/:id/take/:take',Auth,MenuController.take)
router.get('/img/:name',MenuController.image)
module.exports=router