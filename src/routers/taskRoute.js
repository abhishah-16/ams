const express = require("express")
const router = new express.Router()
const Task = require('../models/task')



router.post("/tasks", async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)

    } catch (err) {
        res.status(400).send(err.message)
    }
    console.log("Task : ", task)
})

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get("/tasks/:id", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate)
        return res.status(400).send("Invalid Updates..")
    console.log("_id : ", req.params.id)
    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task)
            return res.status(404).send("Task not found")
        res.status(200).send(task)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task)
            return res.status(400).send("Task not found")
        res.status(400).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router
