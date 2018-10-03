const Admin=require('../models/Admin')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.create=(req,res)=>{
    Admin.findOne({email:req.body.email}).exec().then(admin=>{
        if(admin==null){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({code:0,error:err})
                }
                var admin=Admin({
                    _id:new mongoose.Types.ObjectId(),
                    name:req.body.name,
                    email:req.body.email,
                    password:hash
                })
                admin.save().then(admin=>{
                    return res.status(200).json({code:1,message:"Admin created",data:admin})
                })
                .catch(error=>{
                    console.log(error)
                    return res.status(500).json({code:0,message:"An error occured",error:error})
                })
            })
        }
        else{
            return res.status(200).json({code:0,message:"This admin already exists"}) 
        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,message:"An error occured",error:error})
    })
    
}

exports.login=(req,res)=>{
    Admin.findOne({email:req.body.email}).exec().then(admin=>{
        if(admin==null){
            return res.status(200).json({code:0,message:"This admin does not exist"})
        }
        else{
            bcrypt.compare(req.body.password,admin.password,(err,result)=>{
                if(err){
                    return res.status(500).json({code:0,message:"An error occurred"})
                }
                if(result){
                    const token=jwt.sign({email:admin.email,adminId:admin._id,type:"admin"},process.env.JWT,{
                        expiresIn:"24h"
                    })
                    return res.status(200).json({code:1,message:"Signin successfull",token:token}) 
                }
                else{
                    return res.status(200).json({code:0,message:"Authentication failed"})
                }
            })
        }
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({code:0,message:"An error occurred"})
    })
    
}

exports.admins=(req,res)=>{
    Admin.find().exec().then(admins=>{
        return res.status(200).json({code:1,data:admins})
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,message:"An error occured",error:error})
    })
}


exports.seed=(req,res,next)=>{
    Admin.find().exec().then(admins=>{
        if(admins.length==0){
            var adm=process.env.admin
            bcrypt.hash(process.env.ADMIN_PASS,10,(err,hash)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({code:0,error:err})
                }
                var admin=Admin({
                    _id:new mongoose.Types.ObjectId(),
                    name:process.env.ADMIN_NAME,
                    email:process.env.ADMIN_EMAIL,
                    password:hash
                })
                admin.save().then(admin=>{
                    return res.status(200).json({code:1,message:"Admin created",data:admin})
                })
                .catch(error=>{
                    console.log(error)
                    return res.status(500).json({code:0,message:"An error occured",error:error})
                })
            })  
        }
        else{
            return res.status(200).json({code:0,message:"Admin already exists"}) 
        }
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,message:"An error occured",error:error})
    })
}
