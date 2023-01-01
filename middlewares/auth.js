// To verify that before accessing the ethereum functions user must be logged in 

//Middleware are used to check req is made by appropriate user or not

const jwt = require('jsonwebtoken')
const {promisify} = require('util')

const User = require('../models/user')
module.exports = {
    
    //authenticate function takes a JWT token and decode it into user object by making a query
    authenticate : async(req,res,next) => {
        try{
            const token = req.headers.authorization
            
            if(!token){
                req.user = undefined
                throw new Error("User not found")
            }

            var decodedUser = undefined

            jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
                decodedUser = decoded
              });
            
            //We get user by querying decodedUser into database by _id
            const user = await User.findById(decodedUser._id)
            
            req.user = user

            //next is used for post middleware process
            next()
        }
        catch(err){
            res.status(401).json({
                Message:"Unauthorised User ",
                Error:err})
        }
    }

}
