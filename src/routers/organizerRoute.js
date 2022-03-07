const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isOrganizer } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
const { query } = require("express")
const time = require('../models/alllSlots.json')
function AllTime(allTimings) {
    time.map((timing) => allTimings.push(timing.time));
    return allTimings;
}

function AvailableTime(allTimings, bookedTimings, availableTimings) {
    availableTimings = allTimings.filter(
        (element) => !bookedTimings.includes(element)
    );
    return availableTimings;
}

function BookedTime(bAudi, bookedTimings) {
    bAudi.map((booking) => {
        booking.time.map((time) => bookedTimings.push(time));
    });
    return bookedTimings;
}


// router.get("/organizer/getAvailableSlots/:audiId", async (req, res) => {
//     try {
//         console.log("in getallslots")
//         const audiId = req.params.audiId
//         const allTimings = []
//         const alltime = AllTime(allTimings)
//         res.send("alltime")
//     } catch (err) {
//         res.send(`Error : `, err.message)
//     }
// })

router.get("/organizer/auditorium", [authToken, isOrganizer], async (req, res) => {
    try {
        let auditoriumDetails
        console.log("query:", req.query.city)
        const findBycity = req.query.city ? {city:req.query.city} : {}
        if (req.query.city) {
            auditoriumDetails = await Auditorium.find(findBycity)
        }
        else auditoriumDetails = await Auditorium.find()
        if (!auditoriumDetails[0])
            return res.send({ message: "There is not auditorium availabe right now.!!" })
        res.status(200).send(auditoriumDetails)
    } catch (err) {
        res.send({ error: err.message })
    }
})


router.post("/organizer/getAvailableSlots/:audiId", [authToken, isOrganizer], async (req, res) => {
    console.log("getaltimeslots")
    try {
        res.status(200).send("booked")
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