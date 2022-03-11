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

router.get("/customer/allEvents", [authToken, isUser], async (req, res) => {
    try {
        let match=req.query ? req.query:{}
        const allEvents = await AuditoriumBooking.aggregate([
            {$match:match},
            {$project:{_id:0,timeSlots:0,auditorium_id:0,organizer_id:0,total_cost:0,total_tickets:0,createdAt:0,updatedAt:0}},
        ])
        res.send(allEvents)
    } catch (err) {
        res.send({ error: err.message })
    }
})

module.exports = router