const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isAdmin } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
router.get("/users/managerList", [authToken, isAdmin], async (req, res) => {
    try {
        const status = req.query.status
        var pendingList = []
        const managerList = await User.find({ verificationStatus: status, role: "manager" })
        managerList.forEach(async (manager) => {
            const auditorium = await Auditorium.find({ manager_id: manager.id })
            const managerPending = await User.findById(manager.id)
            pendingList.push({ managerPending, auditorium })

        })
        res.status(200).send(managerList)
    } catch (err) {
        res.status(400).send(err.message)
    }
})


router.post('/users/setManagerStatus', [authToken, isAdmin], async (req, res) => {
    try {
        const Updatedmanager = await User.findByIdAndUpdate(req.body.managerId, { verificationStatus: req.body.verificationStatus }, { new: true, runValidators: true })
        if (Updatedmanager) {
            if (Updatedmanager.verificationStatus=="true")
                sendVerificationAcceptedMail(Updatedmanager.email, Updatedmanager.name)
            else
                sendVerificationRejectedMail(Updatedmanager.email, Updatedmanager.name)

            res.status(200).send(Updatedmanager)
        }
        else res.status(404).send("Manager not found..")
    } catch (err) {
        res.status(404).send(err.message)
    }
})

router.get("/users/acceptedList", [authToken, isAdmin], async (req, res) => {
    try {
        var pendingList = []
        const managerList = await User.find({ verificationStatus: "true", role: "manager" })
        res.status(200).send(managerList)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
router.get("/users/rejectedList", [authToken, isAdmin], async (req, res) => {
    try {
        var pendingList = []
        const managerList = await User.find({ verificationStatus: "false", role: "manager" })
        res.status(200).send(managerList)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get("/users/adminDashboard", [authToken, isAdmin], async (req, res) => {
    try {
        res.status(201).send("Admin dashboard")
    } catch (err) {
        res.status(400).send(err.message)
    }
})


module.exports = router