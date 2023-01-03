
const express = require('express')

const router = express.Router();
const { userSignup, userLogin, getAllUsers } = require('../controllers/userController')
const { authenticate } = require('../middlewares/auth')


router.post("/signup", userSignup)

router.post("/login", userLogin)

router.get("/allusers", authenticate, getAllUsers)


module.exports = router
