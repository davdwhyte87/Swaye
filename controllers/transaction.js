const Transaction=require('../models/Transaction')

exports.uconfirm=(req,res)=>{
    //this function takes the user id from the userData
    var user_id=req.userData.userId
    Transaction.update({_id:req.body.trans_id,user:user_id},{$set:{uconfirmed:true}}).then(trans=>{
        if(trans){
            return res.status(200).json({code:1,message:"You have confirmed your transaction"})
        }
        else{
            return res.status(200).json({code:0,message:"This transaction does not exist"})
        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(200).json({code:0,error:error,message:"An error occurred"})
    })
}

exports.aconfirm=(req,res)=>{
    Transaction.update({_id:req.params.trans_id},{$set:{aconfirmed:true}}).then(trans=>{
        if(trans){
            return res.status(200).json({code:1,message:"You have confirmed your transaction"})
        }
        else{
            return res.status(200).json({code:0,message:"This transaction does not exist"})
        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(200).json({code:0,error:error,message:"An error occurred"})
    })
}

//this gets the transactions belonging to a user
exports.trans=(req,res)=>{
    var user_id=req.userData.userId
    Transaction.find({user:user_id}).exec()
    .then(trans=>{
        return res.status(200).json({code:1,data:trans})
    })
    .catch(error=>{
        return res.status(500).json({code:1,message:"An error occurred",error:error})
    })
}

//this gets all the transactions on the platform
exports.atrans=(req,res)=>{
    Transaction.find().exec()
    .then(trans=>{
        return res.status(200).json({code:1,data:trans})
    })
    .catch(error=>{
        return res.status(500).json({code:1,message:"An error occurred",error:error})
    }) 
}
