const express = require("express")
const router = new express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isOrganizer } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
const { query } = require("express")
const AuditoriumBooking = require('../models/auditoriumBooking')
const time = require('../models/alllSlots.json')
const { ObjectId } = require("mongodb")
const { isValidBookingDate } = require("../utils/utils")
const AudiBookingPayment = require("../models/audiBookingPayment")
// function AllTime(allTimings) {
//     time.map((timing) => allTimings.push(timing.time));
//     return allTimings;
// }

function AvailableTime(allTimings, bookedTimings, availableTimings) {
    availableTimings = allTimings.filter(
        (element) => !bookedTimings.includes(element.slot)
    );
    return availableTimings;
}

// function BookedTime(bAudi, bookedTimings) {
//     bAudi.map((booking) => {
//         booking.time.map((time) => bookedTimings.push(time));
//     });
//     return bookedTimings;
// }
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

router.get("/organizer/getAvailableSlots", [authToken, isOrganizer], async (req, res) => {
    console.log("getalltimeslots")
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
        const status = isValidBookingDate(req.body.event_date)
        if (status != "booked")
            return res.send({ status })
        const auditorium = await Auditorium.findById(req.body.auditorium_id)
        const booking = new AuditoriumBooking({
            ...req.body,
            organizer_id: req.user._id,
            total_cost: req.body.timeSlots.length * auditorium.costPerHour,
            total_tickets: auditorium.capacity,
            available_tickets: auditorium.capacity,
            city: auditorium.city,
        })
        const bookedDetails = await booking.save()
        const message = "Please make payment first to confirm your booking."
        res.send({ BookingId: bookedDetails._id, total_cost: bookedDetails.total_cost, message }).status(200)
    } catch (err) {
        res.send({ error: err.message })
    }
})

router.post("/organizer/audiBookingPayment/:status", [authToken, isOrganizer], async (req, res) => {
    try {

        const event_id = req.body.event_id
        const amount = req.body.amount
        const sender = req.user._id
        const { status } = await AuditoriumBooking.findById(event_id)
        console.log("status", status)
        if (status == "True")
            throw new Error("Payment already completed")
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const { total_cost } = await AuditoriumBooking.findById(req.body.event_id)
            const bookingConfirmation = new AudiBookingPayment({ user_id: sender, event_id, amount, status: "True" })
            console.log("com", amount, total_cost)
            console.log("1")
            if (req.params.status == "True") {
            console.log("2")
                if (amount < total_cost || amount > total_cost)
                    throw new Error(`User ${sender.name} you have enter wrong amount`)
                else if (amount == total_cost) {
                    await AuditoriumBooking.findByIdAndUpdate(event_id, { status: "True" })
                    await bookingConfirmation.save()
                    await session.commitTransaction()
                    return res.json({ amount, status: bookingConfirmation.status })
                }
            }
            else {
                console.log("falied payment")
                await AuditoriumBooking.findByIdAndDelete(event_id)
                const bookingConfirmation = new AudiBookingPayment({ user_id: sender, event_id, amount, status: "False" })
                await bookingConfirmation.save()
                await session.commitTransaction()
                return res.json({ amount, status: bookingConfirmation.status ,message:"Booking has been cancel"})
            }
        } catch (err) {
            const bookingConfirmation = new AudiBookingPayment({ user_id: sender, event_id, amount, status: "Pending" })
            await bookingConfirmation.save()
            console.log("in abort :", err.message)
            await session.abortTransaction()
            return res.json({ amount, status: bookingConfirmation.status, error: err.message })

        } finally {
            session.endSession()
        }

    } catch (err) {
        console.log("err", err.message)
        return res.send({ error: err.message })
    }
})
module.exports = router