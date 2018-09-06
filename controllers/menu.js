const Menu=require('../models/Menu')

exports.add=(req,res)=>{
    var menu=Menu({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.name,
        image:b64toImage(req.body._image),
        qty:req.body.qty,
        created_at:Date()
    })

    menu.save().then(result=>{
        console.log(result)
        res.status(200).json({code:1,message:"Menu item created",data:result})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({error:error})
    })
}

exports.menu=(req,res)=>{
    var menus=Menu().find().exec()
    .then(result=>{
        res.status(200).json({code:1,data:menus})
    })
    .catch(error=>{
        res.status(500).json({error:error})
    })

}

exports.update=(req,res)=>{
    const id=req.params.id
    var updateDate={}
    Menu.update({_id:id},{$set:{name:req.body.name,price:req.body.price,}})
    .then(result=>{
        res.status(200).json({code:1,message:"Menu updated"})
    })
    .catch(error=>{
        res.status(500).json({code:0,error:error})
    })
}

exports.delete=(req,res)=>{
    const id=req.params.id
    Menu.remove({_id:id}).then(result=>{
        res.status(200).json({code:1,message:"Menu deleted"})
    })
    .catch(error=>{
        console.log(error)
        res.status(200).json({code:0,message:"An error occured"})  
    })
}