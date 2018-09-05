const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    summary:{type:String,required:true},
    price:{type:Number,required:true},
    date:{type:String,required:true}
})

module.exports=mongoose.model('Order',orderSchema)