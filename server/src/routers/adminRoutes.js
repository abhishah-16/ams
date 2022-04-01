const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isAdmin } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
const TicketTransaction = require("../models/ticketTransaction")


router.get("/admin/managerList", [authToken, isAdmin], async (req, res) => {
    try {
        let query = req.query.status ? { verificationStatus: req.query.status, role: "manager" } : {}
        let skip = req.query.skip ? Number(req.query.skip) : 0
        // const pendingList = []
        const managerList = await User.aggregate([
            { $match: query },
            {
                $lookup:
                    { from: "auditoria", localField: "_id", foreignField: "manager_id", as: "auditorium" }
            },
            { $project: { password: 0, tokens: 0, "auditorium.auditoriumImages": 0 } },
            {$skip:skip}
        ])
        // res.status(200).send({ count: pendingList.length, pendingList })
        res.status(200).send(managerList)

    } catch (err) {
        res.status(400).send(err.message)
    }
})


router.post('/admin/setManagerStatus', [authToken, isAdmin], async (req, res) => {
    try {
        const Updatedmanager = await User.findByIdAndUpdate(req.body.managerId, { verificationStatus: req.body.verificationStatus }, { new: true, runValidators: true })
        if (Updatedmanager) {
            if (Updatedmanager.verificationStatus == "true")
                a=1//sendVerificationAcceptedMail(Updatedmanager.email, Updatedmanager.name)
            else
            a=1//sendVerificationRejectedMail(Updatedmanager.email, Updatedmanager.name)

            res.status(200).send(Updatedmanager)
        }
        else res.status(404).send("Manager not found..")
    } catch (err) {
        res.status(404).send(err.message)
    }
})

router.get("/admin/acceptedList", [authToken, isAdmin], async (req, res) => {
    try {
        var pendingList = []
        const managerList = await User.find({ verificationStatus: "true", role: "manager" })
        res.status(200).send(managerList)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
router.get("/admin/rejectedList", [authToken, isAdmin], async (req, res) => {
    try {
        var pendingList = []
        const managerList = await User.find({ verificationStatus: "false", role: "manager" })
        res.status(200).send(managerList)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get("/admin/adminDashboard", [authToken, isAdmin], async (req, res) => {
    try {
        res.status(201).send("Admin dashboard")
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get("/admin/removeUser:userId", [authToken, isAdmin], async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId)
        await TicketTransaction.deleteMany({ user_id: req.params.userId })
        res.status(200).send({ message: `User - ${user.name} hase been deleted successfully...` })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})


router.get("/admin/allUsers", [authToken, isAdmin], async (req, res) => {
    try {
        const users = await User.find(req.query)
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})
module.exports = router