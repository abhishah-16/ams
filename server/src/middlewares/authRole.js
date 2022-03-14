const jwt = require("jsonwebtoken")
const User = require("../models/user")
const authToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(" ")[1]
        console.log("header:",token)
        const decoded = jwt.verify(token, process.env.JWTSECRETE)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error("User not authorized.") 
        }

        req.token = token
        req.user = user
    } catch (err) {
       // console.log("in authToken catch")
        return res.status(401).send({ error: "Please authenticate first."})
    } 
    next()  
}

const isManagerSignup = async(req,res,next) => {
    if(req.body.role=="manager"){
    const requiredFields = ['name','email','password','role','auditoriumName','address','city','capacity']
    const manager = await Object.keys(req.body)
    const isValidManager = await requiredFields.every((field) => manager.includes(field))
    if(!isValidManager){
        return res.status(400).send("Please fill all required fields..")
    }
}
    next()
}
const isManager = async (req, res, next) => {
    //console.log("ROle m:",req.user.role)
    if (req.user.role !== "manager")
        return res.status(401).send("Unauthorized person..")
    next()
}
const isAdmin = async (req, res, next) => {
    //console.log("role a : ", req.user.role)
    //console.log("ROle a:",req.user.role)
    if (req.user.role !== "admin")
        return res.status(401).send("Unauthorized person..")
    next()
}
const isUser = async (req, res, next) => {
    //console.log("ROle :",req.user.role)
    if (req.user.role !== "user")
        return res.status(401).send("Unauthorized person..")
    next()
}
const isOrganizer = async (req, res, next) => {
    console.log("ROle :",req.user.role)
    if (req.user.role !== "organizer")
        return res.status(401).send("1Unauthorized person..")
    next()
}

//const auth =
module.exports =  { authToken, isAdmin, isManager, isUser, isOrganizer , isManagerSignup}