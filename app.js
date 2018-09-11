var express=require('express')
var app=express()
var user_route=require('./routes/user')
const morgan=require('morgan')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const admin_routes=require('./routes/admin')
const order_routes=require('./routes/order')
const menu_routes=require('./routes/menu')
const transactions_routes=require('./routes/transaction')
var path = require('path')
require('babel-core').transform("code")

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
})

var dir = path.join(__dirname, 'img');
app.use(express.static(dir));
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',user_route)
app.use('/admin',admin_routes)
app.use('/order',order_routes)
app.use('/menu',menu_routes)
app.use('/transaction',transactions_routes)
app.use(morgan('dev'))
module.exports=app