//There will be two actions users can do - deposit ethereum and withdraw ethereum


//Here we have used key-value export 
module.exports = {

    //function to handle ethereum deposit requests
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

    //function to handle ethereum withdraw requests
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