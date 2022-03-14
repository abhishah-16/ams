const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const TicketTransaction = require("../models/ticketTransaction");
const Auditorium = require("../models/auditorium");
const { authToken, isUser } = require("../middlewares/authRole");
const AuditoriumBooking = require("../models/auditoriumBooking");
const time = require("../models/alllSlots.json");
const { ObjectId } = require("mongodb");
const { isValidBookingDate } = require("../utils/utils");

function AllTime(allTimings) {
  time.map((timing) => allTimings.push(timing.time));
  return allTimings;
}

function AvailableTime(allTimings, bookedTimings, availableTimings) {
  availableTimings = allTimings.filter(
    (element) => !bookedTimings.includes(element.slot)
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
  let sl = [];
  for (let t of bookedSlots) {
    sl = sl.concat(t.timeSlots);
  }
  return sl;
}

router.get("/customer/allEvents", [authToken, isUser], async (req, res) => {
  try {
    let match = req.query ? req.query : {};
    const allEvents = await AuditoriumBooking.aggregate([
      { $match: match },
      {
        $project: {
          _id: 0,
          timeSlots: 0,
          auditorium_id: 0,
          organizer_id: 0,
          total_cost: 0,
          total_tickets: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);
    res.send(allEvents);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// router.post('/event_booking',[authToken,isUser],async(req,res)=>{
//     try{

//         const ticket = new Ticket({
//             seat_no:req.body.seat_no,
//             t_price:req.body.price,
//             event_id:req.body.event_id,
//             user_id:req.user._id,

//         })
//         await ticket.save();
//         res.send(ticket);
//     }catch (err) {
//         res.send({ error: err.message })
//     }

// })

// var objFriends = { fname:"fname",lname:"lname",surname:"surname" };
// Friend.findOneAndUpdate(
//    { _id: req.body.id }, 
//    { $push: { friends: objFriends  } },
//   function (error, success) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(success);
//         }
//     });
// )

router.post("/event_booking", [authToken, isUser], async (req, res) => {
  const event = await AuditoriumBooking.findById(req.body.event_id);
  const total_seats = req.body.seat_numbers.length;
  try {

    const ticketTransaction = new TicketTransaction({
      seat_numbers: req.body.seat_numbers,
      total_price: event.ticket_price * total_seats,
      event_id: req.body.event_id,
      user_id: req.user._id,
    });
    await ticketTransaction.save();
    res.send(ticketTransaction);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.post('/customer/ticket/statusUpdate', [authToken, isUser], async (req, res) => {
  try {
    let tTransaction = await TicketTransaction.findById(req.body.cTrans_id);
    if (tTransaction.status == "confirmed") {
      throw new Error("Payment is already done")
    }
    else {
      const event = await AuditoriumBooking.findById(req.body.event_id);

      for (const s of tTransaction.seat_numbers) {
        TicketTransaction.findOneAndUpdate(
          { _id: req.body.cTrans_id },
          { $push: { tickets: { "t_price": event.ticket_price, "seat_no": s } } },

          function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log(success);
            }
          });
      }
      tTransaction = await TicketTransaction.findByIdAndUpdate({ _id: req.body.cTrans_id }, {
        $set: {
          status: "confirmed"
        }
      }, { new: true })
    }
    res.send({ message: "Payment Done!" })
  } catch (err) {
    res.send({ error: err.message });
  }

})

module.exports = router;
