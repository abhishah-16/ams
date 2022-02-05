const express = require("express")
const { findById } = require("../models/user")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isAdmin, isManagerSignup } = require('../middlewares/authRole')


router.post("/users/signup", isManagerSignup, async (req, res) => {
    console.log("valids fields..")
    const user = new User({
        //...req.body,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    try {
        await user.save()
        const token = await user.generateAuthToken()
        const auditorium = new Auditorium({
            auditoriumName:req.body.auditoriumName,
            address:req.body.address,
            capacity:req.body.capacity,
            city:req.body.city,
            manager_id:user._id
        })
        await auditorium.save()
        res.status(201).send({ username:user.name, auditoriumname : auditorium.auditoriumName , token })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post("/users/login", async (req, res) => {
    console.log("in login")
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //res.status(200).send({ user : user.getPublicProfile(), token })
        console.log("in login try")
        res.status(200).send({ user, token })
    } catch (err) {
        console.log("in login catch")
        res.status(400).send(err.message)
    }
})

router.post('/users/logout', authToken, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send("Successfully logout..")
    } catch (err) {
        res.status(500).send("Error while loging out..")
    }
})

router.post('/users/logoutAll', authToken, async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send("Successfully logout from All accounts..")
    } catch (err) {
        res.status(500).send("Error while loging out from All accounts..")
    }

})

router.get("/users/me", authToken, async (req, res) => {
    res.status(200).send(req.user)
})

router.patch("/users/me", authToken, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate)
        return res.status(400).send("Invalid Updates..")
    console.log("_id : ", req.user._id)
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!req.user)
            return res.status(404).send("User not found")
        res.status(200).send(req.user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/users/me", authToken, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user)
        //     return res.status(404).send("User not found")
        await req.user.remove()
        res.status(200).send(req.user)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router