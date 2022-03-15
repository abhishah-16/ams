const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isManager } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
const AuditoriumBooking = require("../models/auditoriumBooking")

router.get("/manager/auditoriumDetails", [authToken, isManager], async (req, res) => {
    console.log("manager : ", req.user._id, req.user.name)
    const auditoriumDetails = await Auditorium.find({ manager_id: req.user._id })
    res.send(auditoriumDetails)
})



router.patch(('/manager/update/auditoriumDetails'), [authToken, isManager], async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["auditoriumName", "address", "city", "capacity", "costPerHour"]
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate)
        return res.status(400).send("Invalid Updates..")
    console.log("_id : ", req.user._id)
    try {
        const auditorium = await Auditorium.findOneAndUpdate({ manager_id: req.user._id }, req.body, { new: true, runValidators: true })
        if (!auditorium)
            return res.status(404).send("Auditorium not found")
        res.status(200).send(auditorium)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get("/manager/auditoriumEvents", [authToken, isManager], async (req, res) => {
    try {
        console.log("manager : ", req.user._id, req.user.name)
        const auditorium = await Auditorium.findOne({ manager_id: req.user._id });
        const eventDetails = await AuditoriumBooking.find({ auditorium_id: auditorium._id })
        res.send(eventDetails)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/manager/delete/event", [authToken, isManager], async (req, res) => {
    try {
        const event = await AuditoriumBooking.findById(req.body.event_id)
        if (!event) {
            throw new Error("Event not found")
        }
        else {
            event.remove();
            res.send("delete Successfully")
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router