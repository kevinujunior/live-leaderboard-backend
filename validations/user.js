
const validator = require('validator')


const validateUserSignupInput = (data) => {

    //create an empty error object
    let errors = {};

    //extract name and email
    data.name = data.name.trim().length===0?"":data.name;
    data.emailId = data.emailId.trim().length===0?"":data.emailId;


    //if name is empty
    if(validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }


    //if email is empty
    if(validator.isEmpty(data.emailId)){
        errors.emailId = "Email field is required";
    }

    //return errors in object format
    return {
        errors,
        isValid : Object.keys(errors).length===0?true:false
    }
}

const validateUserLoginInput = (data) => {
    let errors = {};
    data.emailId = data.emailId.trim().length===0?"":data.emailId;


    if(validator.isEmpty(data.emailId)){
        errors.emailId = "Email field is required";
    }

    return {
        errors,
        isValid : Object.keys(errors).length===0?true:false
    }
}



module.exports = {validateUserSignupInput,validateUserLoginInput};


