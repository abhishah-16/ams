const mongooese = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user");
const { ObjectId } = require("mongodb");

const ticketTranactionSchema = new mongooese.Schema(
  {
    seat_numbers: {
      type: Array,
      default: 0,
      validate(v) {
        if (v < 0) throw new Error("Seat No. must be a positive number");
      },
    },

    total_price: {
      type: Number,
      default: 0,
      validate(v) {
        if (v < 0) throw new Error("price must be a positive number");
      },
    },

    user_id: {
      type: mongooese.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    event_id: {
      type: mongooese.Schema.Types.ObjectId,
      required: true,
      ref: "AuditoriumBooking",
    },
    status: {
      type: String,
      trim: true,
      default: "Pending",
    },
    tickets:[{
      
        seat_no:{
            type:Number,
        },
        t_price:{
            type:Number,   
        }
    }]
  },
  {
    timestamps: true,
  },
);

const TicketTransaction = mongooese.model(
  "TicketTransaction",
  ticketTranactionSchema
);

module.exports = TicketTransaction;
