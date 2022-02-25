const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isOrganizer } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
const { query } = require("express")

router.get("/organizer/auditorium", [authToken, isOrganizer], async (req, res) => {
    try {
        let auditoriumDetails
        console.log("query:", req.query.city)
        if (req.query.city) {
            auditoriumDetails = await Auditorium.find({ city: req.query.city })
        }
        else auditoriumDetails = await Auditorium.find()
        if (!auditoriumDetails[0])
            return res.send({ message: "There is not auditorium availabe right now.!!" })
        res.status(200).send(auditoriumDetails)
    } catch (err) {
        res.send({ error: err.message })
    }
})

router.post("/organizer/bookAuditorium", [authToken, isOrganizer], async (req, res) => {
    try {
        res.status(200).send("booked")
    } catch (err) {
        res.send({ error: err.message })
    }
})

module.exports = router