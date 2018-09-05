const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Order=require('../models/Order')

router.post('/create',(req,res)=>{

    //an order will not be created until the user has made payment
    var order=Order({
        _id:mongoose.Types.ObjectId,
        summary:req.body.summary,
        price:req.body.price,
        date: new Date().format('m/d/Y h:i:s')
    })
    order.save().then(result=>{
        res.status(200).json({code:1,message:"Your order has been place"})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({code:0,message:"An error occured"})
    })
})

router.post('/user/:id/confirm')
module.exports=router