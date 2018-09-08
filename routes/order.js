const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Order=require('../models/Order')
const OrderController=require('../controllers/order')

router.post('/create',OrderController.create)
router.post('/user/:id/confirm')
module.exports=router