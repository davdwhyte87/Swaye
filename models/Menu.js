const mongoose=require('mongoose')

const menuSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true,},
    image:{type:String},
    price:Number,
    qty:Number,
    created_at:Date
})

module.exports=mongoose.model("Menu",menuSchema)