var express=require('express');
var router=express.Router()
const UserController=require('../controllers/user')

router.get('/',UserController.sayhi)
router.post('/signup',UserController.signup)

module.exports=router;