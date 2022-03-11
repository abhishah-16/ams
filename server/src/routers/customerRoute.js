const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isUser } = require("../middlewares/authRole")
const AuditoriumBooking = require('../models/auditoriumBooking')
const time = require('../models/alllSlots.json')
const { ObjectId } = require("mongodb")
const {isValidBookingDate}  = require("../utils/utils")
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

router.get("/customer/allEvents", [authToken, isOrganizer], async (req, res) => {
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

module.exports = router