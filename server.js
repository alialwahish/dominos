var express = require("express");
var app=express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/domino_db');

//pet_name:"",pet_type:"",pet_description:"",pet_skills
var MongoSchema = new mongoose.Schema({
    email:{type: String, required:true, minlength:4},
    password:{type:String,required:true,minlength:8},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    
    },
    {timestamps:true}
)

mongoose.model("Users",MongoSchema);

var Users = mongoose.model('Users');




app.use(express.static(__dirname+'/public/dist/public'))

var bodyParser= require("body-parser");



var path =require("path");

app.use(bodyParser.json());


// creating session
const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.post('/api/signUp',function(req,res){

    console.log('trying to signUp in database',req.body)
   
})


app.post('/api/login',function(req,res){
    console.log('trying to login in database',req.body)
    Users.find({email:req.body.email,password:req.body.password},function(err){
        if(err){
            res.json({msg:"Error loging user"})

        }
        else{
            res.json({msg:"user not found"})
            
        }
    })
})



app.post('/sessions', (req, res) => {
    console.log(" req.body: ", req.body);
    Users.findOne({email:req.body.email, password: req.body.password}, (err, user) => {
        if (err) {
            console.log("err finding user")
        }
        else {
            console.log("found the user ")
    		req.session.id = user._id;
		req.session.email = user.email;
        }
    })
})




// redirect to home
app.all("*",(req,res,)=>{
    res.sendFile(path.resolve('./public/dist/public/index.html'))    
})


app.listen(8000,function(){
    console.log("listining on port 8000")
})