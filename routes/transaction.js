const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Transaction=require('../models/Transaction')
const TransactionController=require('../controllers/transaction')
const Auth=require('../middleware/auth')
const AdminAuth=require('../middleware/admin')

router.get('/:trans_id/uconfirm',Auth,TransactionController.uconfirm)
router.get('/:trans_id/aconfirm',AdminAuth,TransactionController.aconfirm)
router.get('/',Auth,TransactionController.trans)
router.get('/all',AdminAuth,TransactionController.atrans)
module.exports=router