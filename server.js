const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT","DELETE","UPDATE"],
  },
});


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

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
   
    socket.on('update_score_req', async (data)=>{
        let token = data.authToken
        let score = data.eth
        var decodedUser = undefined
        console.log(data)
        jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
            decodedUser = decoded
            console.log(decoded)
        });
        
        const user = await User.findById(decodedUser._id)
        user.eth = user.eth + parseFloat(score)
        await user.save()
        const allUsers = await User.find({},{_id:0,password:0},{
            sort:{
                eth:-1
            }
        });

        //to update single user data
        //socket.emit('updated_score',allUsers)

        //to update whole database
        io.sockets.emit('updated_score',allUsers)
            
    })

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
  
