const router = require('express').Router();
const User = require('../models/User')
const{registerValidation,loginValidation }=require('../validation')
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');

router.post('/register', async (req,res) =>{
    //validation
    const {error} =registerValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message)
    //Existing
    const EmailExist=await User.findOne({email:req.body.email})
    if(EmailExist)return res.status(400).send('Email already exsists');
    //hash the password
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    const user =new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword 
    })
    try{
        const savedUser=await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req,res) =>{
    //validation
    const {error} =loginValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message)

    //checking if the eamil exists
    const user=await User.findOne({email:req.body.email})
    if(!user)return res.status(400).send("Email dosne't Exist");

    const validPass =await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send("Invalid password")

    // create token
    const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token) 
    //res.send('logged In')
});

router.get('/users', async (req,res)=>{
    await  User.find(function(err,User){
    res.json(User);
  }) 
});


module.exports=router;