const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
require('dotenv').config();

app.use(cors())
app.use(bodyParser.json())

/* ----Database-----*/

//to supress warning
mongoose.set("strictQuery", false);

//connect using secret key
mongoose.connect(process.env.MONGOURI);


//if connection is on
mongoose.connection.on("connected",(req,res)=>{
    console.log("Connected to MongoDB");
})


//if error is generated
mongoose.connection.on("error",(err)=>{
    console.log("error while connecting ",err);
})

/*----Database connection ends here-----*/


//user model is included
require('./models/user')

var userRoutes = require('./routes/user')
var ethereumRoutes = require('./routes/ethereum')

//route functions to endpoints

//user routes for login and signup
app.use('/api/user',userRoutes)

//score routes for deposit and withdraw
app.use('/api/eth',ethereumRoutes)


//home page
app.get("/",(req,res)=>{
    res.send("This is home of server");
});


app.listen(process.env.port || 5000)