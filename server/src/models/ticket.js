const mongooese = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./user')

const ticketSchema = new mongooese.Schema(
    {
    
        seat_no: {
            type: Number,
            default: 0,
            validate(v) {
                if (v < 0) throw new Error('Seat No. must be a positive number')
            }
        },
        t_price: {
            type: Number,
            default: 0,
            validate(v) {
                if (v < 0) throw new Error('price must be a positive number')
            }
        },
      
        status: {
            type: String,
            trim: true,
            default: "pending"
        },
      
     
        user_id: {
            type: mongooese.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        event_id: {
            type: mongooese.Schema.Types.ObjectId,
            required: true,
            ref: 'AuditoriumBooking'
        }
    },{
        timestamps:true
    }
)

const Ticket = mongooese.model('Ticket', ticketSchema)

module.exports = Ticket