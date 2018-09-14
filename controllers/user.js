const User=require('../models/User')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')


//test
exports.sayhi=(req,res)=>{
    res.status(200).json({message:"how far"})
}


//sign up function
exports.signup=(req,res)=>{
    req.check("name","Name is required").isString().exists()
    req.check("phone","Invalid phone number").isLength({min:8}).exists()
    var errors=req.validationErrors()
    if(errors){
        return res.status(200).json({code:0,message:"An error occured",errors:errors})
    }    
    //check if a user exists
    User.find({phone:req.body.phone}).exec().then(user=>{
        if(user.length>0){
            return res.status(200).json({code:0,message:"This user already exists."})
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500)
                    .json({code:0,error:err,message:"An error occurred"})
                }
                else{
                    var user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        phone:req.body.phone,
                        password:hash,
                        code:Math.floor(Math.random()*90000) + 10000
                    })
                    user.save().then(result=>{
                        //send user a mail
                        console.log(result)
                        res.status(200).json({code:1,message:"User created successfully",data:user})
                    })
                    .catch(error=>{
                        console.log(error)
                        return res.status(500).json({error:error})
                    })
                }
            })
        }
    })
}

//sign in a user
exports.signin=(req,res)=>{
    //get the user by phone data
    User.findOne({phone:req.body.phone})
    .exec().then(user=>{
        if(!user){
            return res.status(200).json({code:0,message:"This account does not exist"})
        }else{
            //check the password
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){
                    return res.status(404).json({code:0,message:"An error occurred"})
                }
                if(result){
                    //create token
                    const token=jwt.sign({phone:user.phone,userId:user._id,type:"user"},process.env.JWT,{
                        expiresIn:"1h"
                    })
                    return res.status(200).json({code:1,message:"Signin successfull",token:token,data:user}) 
                }
                else{
                    return res.status(200).json({code:0,message:"Authentication failed"})
                }
            })
        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,message:"An error occurred"})
    })
}


//confirms a user account with a code
exports.confirm=(req,res)=>{
    req.check("code","You need the code").exists()
    var errors=req.validationErrors()
    if(errors){
        return res.status(200).json({code:0,message:"An error occured",errors:errors})
    } 
    User.findOne({code:req.body.code}).exec()
    .then(user=>{
        if(user){
            user.confirmed=true
            user.save().then(result=>{
                console.log(result)
                res.status(200).json({code:1,message:"Your account has been confirmed"})
            })
            .catch(error=>{
                console.log(error)
                res.status(500).json({error:error,code:0,message:"An error occurred"})
            })
        }else{
            res.status(200).json({code:0,message:"This code does not exist"}) 
        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({error:error})
    })
}

exports.forgot_pass=(req,res)=>{
    User.findOne({phone:req.body.phone}).exec()
    .then(user=>{
        if(user){
            user.code=Math.floor(Math.random()*90000) + 10000
            user.save().then(result=>{
                console.log(result)
                return res.status(200).json({code:1,message:"A meail has been sent with your code",data:result})
            })
            .catch(error=>{
                console.log(error)
                return res.status(500).json({code:0,message:"An error occured"})
            })
        }
        else{
            return res.status(200).json({code:0,message:"This email does not exist"})
        }
    })
    .catch(error=>{
        return res.status(500).json({code:0,message:"An error occured",error:error})
    })
}

exports.fchange_pass=(req,res)=>{
    User.findOne({code:req.body.code}).exec()
    .then(user=>{
        if(user){
            bcrypt.hash(req.body.new_password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({error:err,code:0})
                }
                user.password=hash
                user.save().then(result=>{
                    console.log(result)
                    return res.status(200).json({code:1,message:"Your password has been changed"})
                })
                .catch(error=>{
                    console.log(error)
                    return res.status(500).json({code:0,error:error,message:"An error occurred"})
                })
            })
        }
        else{
            return res.status(200).json({code:0,message:"Wrong code!"}) 
        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,error:error,message:"An error occurred"}) 
    })
}

//get a signed in user
//protected function
exports.user=(req,res)=>{
    var user_id=req.userData.userId
    User.findOne({_id:user_id})
    .select("name email phone")
    .exec()
    .then(user=>{
        if(user){
            return res.status(200).json({code:1,data:user})
        }
        else{
            return res.status(200).json({code:0,message:"This account does not exist"})
        }
    })
    .catch(error=>{
        return res.status(500).json({code:0,error:error})
    })
}