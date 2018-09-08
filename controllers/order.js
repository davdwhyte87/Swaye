const Order=require('../models/Order')
const Transaction=require('../models/Transaction')


exports.create=(req,res)=>{

    //an order will not be created until the user has made payment
    var order=Order({
        _id:new mongoose.Types.ObjectId,
        summary:req.body.summary,
        price:req.body.price,
        date: new Date().format('m/d/Y h:i:s'),
        user:req.userData.userId
    })
    order.save().then(result=>{
        res.status(200).json({code:1,message:"Your order has been place",data:result})
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
    Order.update({_id:id},{$set:{confirmed:true}}).then(order=>{
        console.logO(order)
        var transaction=Transaction({
            _id:new mongoose.Types.ObjectId,
            summary:order.summary,
            price:order.price,
            date: new Date().format('m/d/Y h:i:s')
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
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,error:error,message:"An error occurred"})
    })
}




