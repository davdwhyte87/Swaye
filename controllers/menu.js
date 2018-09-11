const Menu=require('../models/Menu')
const base64Img=require('base64-img')
const mongoose=require('mongoose')


exports.add=(req,res)=>{
    var fname=randName()
    base64Img.img(req.body._image, 'img/menu', fname, function(err, filepath) {
        
        if(err){
            return res.status(500).json({code:0,message:"An upload error occured",erro:err})
        }
        if(filepath){
            var fn=filepath.split('\\').pop().split('/').pop()
            console.log(fn)
            var menu=Menu({
                _id: new mongoose.Types.ObjectId(),
                name:req.body.name,
                price:req.body.price,
                image:fn,
                qty:req.body.qty,
                created_at:Date()
            })
            menu.save().then(result=>{
                console.log(result)
                res.status(200).json({code:1,message:"Menu item created",data:result})
            })
            .catch(error=>{
                console.log(error)
                res.status(500).json({code:0,error:error})
            }) 
        }
        
    })
}

function randName(){
    var name=Math.floor((Math.random() * 10000000) + 99000000000)
    return name
}
function b64toImage(data,fname){
    base64Img.img(data, 'menu', fname, function(err, filepath) {

    })
}

//this gets all the menu items
exports.menu=(req,res)=>{
    Menu.find()
    .exec()
    .then(result=>{
        res.status(200).json({code:1,data:result})
    })
    .catch(error=>{
        res.status(500).json({error:error})
    })
}

exports.update=(req,res)=>{
    const id=req.params.id
    Menu.update({_id:id},{$set:{name:req.body.name,price:req.body.price,qty:req.body.qty}})
    .then(result=>{
        res.status(200).json({code:1,message:"Menu updated",data:result})
    })
    .catch(error=>{
        res.status(500).json({code:0,error:error})
    })
}

exports.take=(req,res)=>{
    const id=req.params.id
    Menu.findOne({_id:id}).exec()
    .then(menu=>{
        if(menu){
            if(menu.qty<1){
                return res.status(200).json({code:0,message:"Sorry no more, its finished"}) 
            }
            let current_qty=menu.qty
            let new_qty=current_qty-req.params.take
            menu.qty=new_qty
            menu.save().then(result=>{
                if(result){
                    return res.status(200).json({code:1})
                }
            })
            .catch(err=>{
                return res.status(500).json({code:0,message:"An error occured",error:err})
            })
        }
        else{
            return res.status(200).json({code:0,message:"There is no menu item like that"}) 
        }
    })
    .catch(err=>{
        return res.status(500).json({code:0,message:"An error occured",error:err})
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

exports.image=(req,res)=>{
    var fs=require('fs')
    let name=req.params.name
    var img = fs.readFileSync('./img/menu/'+name);
    res.writeHead(200, {'Content-Type': 'image/gif' })
    res.end(img, 'binary')
}