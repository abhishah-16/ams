const express = require("express")
const router = new express.Router()
const User = require('../models/user')


router.post("/users", async (req, res) => {
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

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get("/users/:name", async (req, res) => {
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

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate)
        return res.status(400).send("Invalid Updates..")
    console.log("_id : ", req.params.id)
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user)
            return res.status(404).send("User not found")
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user)
            return res.status(400).send("User not found")
        res.status(400).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router