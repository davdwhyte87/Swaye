const express=require('express')
const router=express.Router()
const AdminController=require('../controllers/admin')
const AdminAuth=require('../middleware/admin')

router.post('/create',AdminAuth,AdminController.create)
router.post('/login',AdminController.login)
router.get('/',AdminAuth,AdminController.admins)
router.get('/seed',AdminController.seed)
module.exports=router