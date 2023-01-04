
module.exports = {

    /*
        Purpose :  To deposit ethereum
        Input : Amount to be deposited
    */
    ethereumDeposit : async(req,res,next)  => {
        try{
            const score = req.body.score
            const currUser = req.user
            currUser.eth = currUser.eth + score

            await currUser.save()

            return res.status(200).json({Message:score + " Ethereum Deposited "})
        }
        catch(err){
            res.status(400).json({Message:"Invalid Request "+err})
        }
    },

    /*
    Purpose :  To withdraw ethereum
    Input : Amount to be withdrawn
    */

    ethereumWithdraw : async(req,res,next)  => {
        try{

            const score = req.body.score
            const currUser = req.user
            currUser.eth = currUser.eth - score

            await currUser.save()

            return res.status(200).json({Message:score + " Ethereum Withdrawn "})

        }
        catch(err){
            res.status(400).json({Message:"Invalid Request "+err})
        }
    }


}