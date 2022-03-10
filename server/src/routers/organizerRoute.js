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
        const audiId = req.body.audiId
        const bookedSlots  = req.body.bookedSlots
        res.status(200).send("booked")
    } catch (err) {
        res.send({ error: err.message })
    }
})

router.get('/organizer/getAvailableSlots/:audiId', async (req, res) => {
    try {
        //const avaialeSlots = await Auditorium.find({_id:req.params.audiId,"$bookedSlots.status":true})
        const avaialeSlots = await Auditorium.aggregate([
            { $match: { "bookedSlots.status": true } },
            { $unwind: { path: "$bookedSlots" } },
            { $project: { bookedSlots: 1, _id: 0 } }
        ])

        let sl = []
        for (let s of avaialeSlots) {
            console.log("s", s.bookedSlots.status)
            const a = s.bookedSlots
            if(!a.status){
                sl.push({slot:a.slot,start:a.startTime,end:a.endTime})
            }
        }
        // sl = avaialeSlots.filter(
        //     (element) => { element.bookedSlots.status == true } //!bookedTimings.includes(element)
        // );

        res.send(sl)
    } catch (err) {
        res.send(err.message)
    }
})

module.exports = router