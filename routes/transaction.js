const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Transaction=require('../models/Transaction')
const TransactionController=require('../controllers/transaction')
const Auth=require('../middleware/auth')

router.post('/uconfirm',Auth,TransactionController.uconfirm)
router.post('/aconfirm',TransactionController.aconfirm)
module.exports=router