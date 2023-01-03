//There will be two actions users can do - deposit ethereum and withdraw ethereum


/*
Purpose :  To deposit ethereum
Input : Amount to be deposited
*/
export async function ethereumDeposit(req, res, next) {
    try {
        const score = req.body.score
        const currUser = req.user
        currUser.eth = currUser.eth + score

        await currUser.save()

        return res.status(200).json({ Message: score + " Ethereum Deposited " })
    }
    catch (err) {
        res.status(400).json({ Message: "Invalid Request " + err })
    }
}

/*
Purpose :  To withdraw ethereum
Input : Amount to be withdrawn
*/

export async function ethereumWithdraw(req, res, next) {
    try {

        const score = req.body.score
        const currUser = req.user
        currUser.eth = currUser.eth - score

        await currUser.save()

        return res.status(200).json({ Message: score + " Ethereum Withdrawn " })

    }
    catch (err) {
        res.status(400).json({ Message: "Invalid Request " + err })
    }
}