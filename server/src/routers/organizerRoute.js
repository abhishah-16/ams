const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isOrganizer } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
const { query } = require("express")
const AuditoriumBooking = require('../models/auditoriumBooking')
const time = require('../models/alllSlots.json')
const { ObjectId } = require("mongodb")
function AllTime(allTimings) {
    time.map((timing) => allTimings.push(timing.time));
    return allTimings;
}

function AvailableTime(allTimings, bookedTimings, availableTimings) {
    availableTimings = allTimings.filter(
        (element) =>
            !bookedTimings.includes(element.slot)
    );
    return availableTimings;
}

function BookedTime(bAudi, bookedTimings) {
    bAudi.map((booking) => {
        booking.time.map((time) => bookedTimings.push(time));
    });
    return bookedTimings;
}
function getMergeTimeSlots(bookedSlots) {
    let sl = []
    for (let t of bookedSlots) {
        sl = sl.concat(t.timeSlots)
    }
    return sl
}

router.get("/organizer/auditorium", [authToken, isOrganizer], async (req, res) => {
    try {
        let auditoriumDetails
        console.log("query:", req.query.city)
        const findBycity = req.query.city ? { city: req.query.city } : {}
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


router.post("/organizer/getAvailableSlots", [authToken, isOrganizer], async (req, res) => {
    console.log("getaltimeslots")
    try {
        const audiId = req.body.auditorium_id
        const date = req.body.date
        let bookedSlots = await AuditoriumBooking.aggregate([
            { $match: { auditorium_id: ObjectId(audiId), event_date: date } },
            { $project: { timeSlots: 1, _id: 0 } }
        ])
        console.log("bookedslot", bookedSlots)
        bookedSlots = getMergeTimeSlots(bookedSlots)
        let availableTimings = []
        const availableTimeSlots = AvailableTime(time, bookedSlots, availableTimings)
        res.send(availableTimeSlots).status(200)
    } catch (err) {
        res.send({ error: err.message })
    }
})

router.post("/organizer/bookAuditorium", [authToken, isOrganizer], async (req, res) => {
    try {
        const timeSlots = req.body.timeSlots

        const booking = new AuditoriumBooking({
            ...req.body,
            organizer_id: req.user._id,
            total_cost: 32000,
            available_ticket: 0
        })
        const bookedDetails = await booking.save()
        res.send(bookedDetails).status(200)
    } catch (err) {
        res.send({ error: err.message })
    }
})

module.exports = router