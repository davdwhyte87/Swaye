const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try{
        const decode=jwt.verify(req.headers['token'],process.env.JWT)
        req.userData=decode
        if(req.userData.type="user"){
            next()
        }
        else{
            return res.status(200).json({code:0,message:"An error occured"}) 
        } 
    }
    catch(error){
        console.log(error)
        return res.status(200).json({code:190,message:"An error occured"})
    }
    
}