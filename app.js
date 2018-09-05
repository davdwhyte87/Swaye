var express=require('express')
var app=express()
var user_route=require('./routes/user')
const morgan=require('morgan')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
})


mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',user_route)
app.use(morgan('dev'))
module.exports=app