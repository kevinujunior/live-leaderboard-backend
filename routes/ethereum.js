//Points of individual user is referred as ETH


const express = require('express')

const router = express.Router();
const { ethereumDeposit, ethereumWithdraw } = require('../controllers/ethereumController')
const { authenticate } = require('../middlewares/auth')

//url middleware function -> execution order (using next())

router.put("/deposit", authenticate, ethereumDeposit)

router.put("/withdraw", authenticate, ethereumWithdraw)


module.exports = router