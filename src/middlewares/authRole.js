const jwt = require("jsonwebtoken")
const User = require("../models/user")
const authToken = async (req, res, next) => {
    console.log("In auth")
    try {
        const token = req.header('Authorization').split(" ")[1]
        const decoded = jwt.verify(token, "thisismysecretforkwttoken")
        console.log("token : ", decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            console.log("user is not...",user.name)
            throw new Error("User not authorized.")
        }
        req.token = token
        req.user = user
    } catch (err) {
        console.log("in authToken catch")
        res.status(401).send({ error: "Please authenticate first." })
    }
    next()
}
const isManager = async (req, res, next) => {
    console.log("ROle m:",req.user.role)
    if (req.user.role !== "manager")
        return res.status(404).send("Unauthorized person..")
    next()
}
const isAdmin = async (req, res, next) => {
    //console.log("role a : ", req.user.role)
    console.log("ROle a:",req.user.role)
    if (req.user.role !== "admin")
        return res.status(404).send("Unauthorized person..")
    next()
}
const isUser = async (req, res, next) => {
    console.log("ROle :",req.user.role)
    if (req.user.role !== "user")
        return res.status(404).send("Unauthorized person..")
    next()
}
const isOrganizer = async (req, res, next) => {
    console.log("ROle :",req.user.role)
    if (req.user.role !== "organizer")
        return res.status(404).send("Unauthorized person..")
    next()
}

//const auth =
module.exports =  { authToken, isAdmin, isManager, isUser, isOrganizer }