const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const {authToken , isAdmin } = require("../middlewares/authRole")
router.get("/users/pendingList",[authToken , isAdmin], async (req, res) => {
    try {
        res.status(201).send("pending list..")
    } catch (err) {
        res.status(400).send(err.message)
    }
})
router.get("/users/adminDashboard",[authToken , isAdmin], async (req, res) => {
    try {
        res.status(201).send("Admin dashboard")
    } catch (err) {
        res.status(400).send(err.message)
    }
})


module.exports = router