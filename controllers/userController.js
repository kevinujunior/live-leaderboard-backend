//Main logic for your backend services, all functional code for your request


//await function must be completed before proceeding to next line of the code


const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {validateUserSignupInput,validateUserLoginInput} = require('../validations/user')
require('dotenv').config()


module.exports = {

    //function to handle userSignup requests
    userSignup : async(req,res,next)  => {
        try{
           
            //get object returned by the validations
           const {errors,isValid} = validateUserSignupInput(req.body)
           
           //if req is invalid return
           if(!isValid) return res.status(400).json(errors)

           const {emailId,password,name}  = req.body
           const user = await User.findOne({emailId})


           //if user with this email exists return error
           if(user){
            errors.emailId = "This Email already exist";

            return res.status(400).json(errors)
           }


           //hash the password 
           const hashedPassword = await bcrypt.hash(password,10)

           //create a new user object that will be saved into database with hashed password
           const newUser = await new User({
                emailId,
                name,
                password : hashedPassword
           })

           //await means the following lines won't be executed until this lines finish its execution
           await newUser.save()
           res.status(201).json({Result:"new User is created with email "+newUser.emailId})
        }
        catch(err){
            res.status(400).json({Message:"Invalid Request "+err})
        }
    },
    
    //function to handle userLogin requests
    userLogin : async(req,res,next)  => {
        try{

            const {errors,isValid} = validateUserLoginInput(req.body)
           
            //if req is invalid return 
            if(!isValid) return res.status(400).json(errors)


            //find the user object using given credentials
            const {emailId,password}  = req.body

            const user = await User.findOne({emailId})

            //if user does not exist return
            if(!user){
                errors.emailId = "This user does not exist";
    
                return res.status(404).json(errors)
            }

            //if user present check password
            const isCorrect = await bcrypt.compare(password,user.password)


            //if password incorrect return
            if(!isCorrect){
                errors.password = "Invalid Credentials";

                return res.status(400).json(errors)
            }


            //set password as undefined so it is not returned when we return our user object
            user.password = undefined

            //generate a token when we sign in 
            const token = jwt.sign(
                user.toJSON()
              , process.env.JWTSECRET, { expiresIn: '1h' });

            //return token and user object
            return res.status(200).json({
                jwt : token,
                user
            })

        }
        catch(err){
            res.status(400).json({Message:"Invalid Request "+err})
        }
    },

    getAllUsers : async(req,res,next) =>{

    }

}