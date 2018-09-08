const Admin=require('../models/Admin')
const bcrypt=require('bcrypt')


module.exports=(req,res,next)=>{
    Admin.find().exec().then(admins=>{
        if(!admins){
            var adm=process.env.admin
            bcrypt.hash(adm.password,10,(err,hash)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({code:0,error:err})
                }
                var admin=Admin({
                    _id:new mongoose.Types.ObjectId(),
                    name:adm.name,
                    email:adm.email,
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
    })
    .catch(error=>{
        console.log(error)
        return res.status(500).json({code:0,message:"An error occured",error:error})
    })
}
