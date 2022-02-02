const express = require("express")
const app = express()
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to task manager")
})

app.post("/users", async (req, res) => {
    const user = new User(req.body)
    // // normal promise syntax
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((err)=>{
    //     res.status(400).send(err.message)
    // })
    // use async/await in code
    try {
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
    console.log("User : ", user)
})

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get("/users/:name", async (req, res) => {
    const username = req.params.name
    console.log("username : ", username)
    try {
        const users = await User.find({ name: username })
        if (!users.length)
            return res.status(404).send("User not found")
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.post("/tasks", async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)

    } catch (err) {
        res.status(400).send(err.message)
    }
    console.log("Task : ", task)
})

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id
    console.log("_id : ", _id)
    try {
        const tasks = await Task.findById(_id)
        if (!tasks)
            return res.status(404).send("Task not found")
        res.status(200).send(tasks)

    } catch (err) {
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log("server is running on port : ", port)
})