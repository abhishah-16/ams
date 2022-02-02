const express = require("express")
const app = express()
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to task manager")
})

app.post("/users",(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
    console.log("User : ",user)
})

app.get("/users",(req,res)=>{
    User.find({}).then((users)=>{
        res.status(200).send(users)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
})

app.get("/users/:name",(req,res)=>{
    const username = req.params.name
    console.log("username : ",username)
    User.find({name:username}).then((users)=>{
        if(!users.length) 
            return res.status(404).send("User not found")
        res.status(200).send(users) 
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
})

app.post("/task",(req,res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
    console.log("Task : ",task)
})


app.listen(port,()=>{
    console.log("server is running on port : ",port)
})