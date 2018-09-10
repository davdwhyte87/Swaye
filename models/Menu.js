const mongoose=require('mongoose')

const menuSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    image:{type:String},
    price:{type:Number,required:true},
    qty:{type:Number,required:true},
    created_at:{type:String,required:true}
})

module.exports=mongoose.model("Menu",menuSchema)