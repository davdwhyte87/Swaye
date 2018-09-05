const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:String,
    password:{type:String,required:true},
    confirmed:{type:Boolean,required:true,default:false},
    created_at:Date
})

module.exports=mongoose.model("User",userSchema)