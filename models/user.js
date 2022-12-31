const mongoose = require('mongoose')

const {Schema} = mongoose


// User Schema Created in MongoDB
const userSchema = new Schema({
    emailId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    eth : {
        type : Number,
        required : true,
        default : 0,
    }
})


module.exports = mongoose.model("User",userSchema)