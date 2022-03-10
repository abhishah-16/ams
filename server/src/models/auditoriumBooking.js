const mongooese = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./user')
const AuditoriumBookingSchema = new mongooese.Schema(
    {

        event_date: {
            type: String,
            required: true,
            trim: true
        },
        timeSlots: [{
            type: Number,
            required: true,
            trim: true,
        }],
        organizer_id: {
            type: mongooese.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        total_cost: {
            type: Number,
            required: true,
        },
        auditorium_id: {
            type: mongooese.Schema.Types.ObjectId,
            required: true,
            ref: 'Auditorium'
        },
        description: {
            type: String,
            required: true
        },
        event_name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        event_time: {
            type: String,
            required: true
        },
        ticket_price:{
            type:Number,
            required:true
        },
        total_tickets:{
            type:Number,
            required:true
        },
        available_tickets:{
            type:Number,
            default:0
        }
    },{
        timestamps:true
    }
)
const AuditoriumBooking = mongooese.model('AuditoriumBooking', AuditoriumBookingSchema)

module.exports = AuditoriumBooking