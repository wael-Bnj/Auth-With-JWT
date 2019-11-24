const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authrouter = require('./routes/auth') 
const postRoute =require('./routes/posts')
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

mongoose.connect( 'mongodb://localhost:27017/mybase', { useNewUrlParser:true , useUnifiedTopology: true},()=>console.log('connected to db'));

mongoose.connection.on('error',(err)=>{
    if(err){  
    console.log('error to database Connection'+err);
    }
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017')
});

//Middleware
app.use(express.json())

// pour donneé l'autorization a acceder aux web services (ressoursses)
//adding middleware
app.use(cors());

// routerne le middleware en json
app.use(bodyParser.json());

//Router Middleware
app.use('/api/user',authrouter);
app.use('/api/post',postRoute); 

app.listen(3000, () => console.log('API running on localhost:'));