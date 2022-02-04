const express = require("express")
const router = new express.Router()
const Task = require('../models/task')
const {authToken} = require('../middlewares/authRole')


router.post("/tasks", authToken, async (req, res) => {
    //const task = new Task(req.body)
    console.log("task created user : ", req.user)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)

    } catch (err) {
        res.status(400).send(err.message)
    }
    console.log("Task : ", task)
})

router.get("/tasks", authToken, async (req, res) => {
    try {
        //const tasks = await Task.find({owner:req.user._id})
        //below is alternative login to make relationship between task and user
        await req.user.populate('tasks')
        res.status(200).send(req.user.tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get("/tasks/:id", authToken, async (req, res) => {
    const _id = req.params.id
    console.log("_id : ", _id, req.user._id)
    try {
        //const tasks = await Task.findById(_id)
        const tasks = await Task.findOne({ _id, owner: req.user._id })
        if (!tasks)
            return res.status(404).send("Task not found")
        res.status(200).send(tasks)

    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch("/tasks/:id", authToken, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate)
        return res.status(400).send("Invalid Updates..")
    console.log("_id : ", req.params.id)
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        //const task = await Task.findById(req.params.id)
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task)
            return res.status(404).send("Task not found")

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.status(200).send(task)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/tasks/:id", authToken ,async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id , owner:req.user._id}) 
        if (!task)
            return res.status(400).send("Task not found")
        res.status(400).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router
