var express=require('express')
var router=express.Router()
var Menu=require('./models/Menu')
var mongoose=require('mongoose')
const MenuController=require('../controllers/menu')

router.post('/add',MenuController.add)

//this gets all the menu items
router.get('/',MenuController.menu)

//updating a menu
router.patch('/:id',MenuController.update)


router.delete('/:id',MenuController.delete)





function b64toImage(b64string){

}