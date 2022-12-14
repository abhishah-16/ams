const mongooese = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./user')
const AuditoriumSchema = new mongooese.Schema(
    {
        auditoriumName: {
            type: String,
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
        costPerHour:{
            type:Number,
            //required:true
        },
        "auditoriumDescription":{
            type:String,
            required:true
        },
        manager_id: {
            type: mongooese.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        auditoriumImages:[{
            image:{
                type:Buffer
            }}
        ]
    }
)
const Auditorium = mongooese.model('Auditorium', AuditoriumSchema)

module.exports = Auditorium