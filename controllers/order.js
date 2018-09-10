const Order=require('../models/Order')
const Transaction=require('../models/Transaction')
const mongoose=require('mongoose')
 
exports.create=(req,res)=>{

    //an order will not be created until the user has made payment
    var order=Order({
        _id:new mongoose.Types.ObjectId(),
        summary:req.body.summary,
        price:req.body.price,
        date: Date('m/d/Y h:i:s'),
        user:req.userData.userId
    })
    order.save().then(result=>{
        res.status(200).json({code:1,message:"Your order has been placed",data:result})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({code:0,message:"An error occured",error:error})
    })
}

//confirms an order and creates a transaction
//only admin has permission
exports.confirm=(req,res)=>{
    var id=req.params.id
    Order.findOne({_id:id}).exec().then(order=>{
        order.confirmed=true
        order.save().then(()=>{
            var transaction=Transaction({
                _id:new mongoose.Types.ObjectId(),
                summary:order.summary,
                price:order.price,
                user:order.user,
                date: Date()
            })
            transaction.save().then(trans=>{
                Order.deleteOne({_id:order.id}).then(reds=>{
                    return res.status(200).json({code:1,message:"The order has been confirmed"})
                })
                .catch(error=>{
                    console.log(error)
                    return res.status(500).json({code:0,error:error,message:"An error occured"})
                })
            })
            .catch(error=>{
                console.log(error)
                return res.status(500).json({code:0,error:error,message:"An error occurred"})
            })
        })
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,error:error,message:"An error occurred"})
    })
}




