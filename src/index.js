const express = require("express")
const app = express()
require('./db/mongoose')
const User = require('./models/user')
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to task manager")
})

app.post("/users",(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
    console.log("User : ",user)
})


app.listen(port,()=>{
    console.log("server is running on port : ",port)
})