const mongooese = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./user')
const AuditoriumSchema = new mongooese.Schema(
    {
        auditoriumName: {
            type: Date,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            default: 0,
            validate(v) {
                if (v < 0) throw new Error('Capacity must be a positive number')
            }
        },
        BookedSlots: [{
            slot: {
                type: Number,
            },
            startTime: {
                type: Number
            },
            endTime: { type: Number },
            status:{type:Boolean}
        }
        ],
        manager_id: {
            type: mongooese.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
)
const Auditorium = mongooese.model('Auditorium', AuditoriumSchema)

module.exports = Auditorium