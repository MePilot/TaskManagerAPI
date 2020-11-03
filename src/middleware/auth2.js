const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req,res,next)=> {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        
        if(!user) {
            throw new Error()
        }
        res.logged=true
        next()

    }
    catch {
        res.logged=false
        next()
    }
    
}
module.exports=auth
