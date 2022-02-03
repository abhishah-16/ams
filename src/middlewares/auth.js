const jwt = require("jsonwebtoken")
const User = require("../models/user")
const auth = async (req, res, next) => {
    console.log("In auth.js")
    try {   
        const token = req.header('Authorization').split(" ")[1]
        const decoded = jwt.verify(token,"thisismysecretforkwttoken")
        const user = await User.findOne({_id:decoded._id ,'tokens.token':token})
        
        if(!user){
            throw new Error("User not authorized.")
        }
        req.token = token
        req.user = user
    } catch (err) {
        res.status(401).send({ error: "Please authenticate first." })
    }
    next()

}
module.exports = auth