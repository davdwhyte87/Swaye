const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Order=require('../models/Order')
const OrderController=require('../controllers/order')
const Auth=require('../middleware/auth')
const AdminAuth=require('../middleware/admin')

//an authenticated user can create a transaction
router.post('/create',Auth,OrderController.create)
//confirm a transaction by the admin
router.get('/:id/confirm',AdminAuth,OrderController.confirm)
module.exports=router