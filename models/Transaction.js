const mongoose=require('mongoose')

var transactionsSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    summary:{type:String,required:true},
    price:{type:Number,required:true},
    aconfirmed:{type:Boolean,default:false},
    uconfirmed:{type:Boolean,default:false},
    date:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'}
})

module.exports=mongoose.model('Transaction',transactionsSchema)