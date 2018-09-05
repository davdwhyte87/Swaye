const User=require('../models/user')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')

//test
exports.sayhi=(req,res)=>{
    res.status(200).json({message:"how far"})
}

//sign up function
exports.signup=(req,res)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length>0){
            return res.status(409).json({code:0,message:"This user already exists."})
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500)
                    .json({code:0,error:err,message:"An error occurred"})
                }
                else{
                    user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password:hash
                    })
                    user.save().then(result=>{
                        //send user a mail
                        console.log(result)
                        res.status(200).json({code:1,message:"User created successfully",data:user})
                    })
                    .catch(error=>{
                        console.log(error)
                        res.status(500).json({error:error})
                    })
                }
            })
        }
    })
}

//sign in a user
