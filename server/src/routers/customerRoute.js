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
    let match = {}
    if (req.query._id)
      match = { _id: ObjectId(req.query._id) }
    else match = req.query ? req.query : {};
    console.log("query", match)
    const allEvents = await AuditoriumBooking.aggregate([
      { $match: match },
      {
        $project: {
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

router.post("/customer/event_booking", [authToken, isUser], async (req, res) => {
  const event = await AuditoriumBooking.findById(req.body.event_id);
  const total_seats = req.body.seat_no.length;
  const price = event.ticket_price;
  var objTicket = { "t_price": price }
  console.log("objTicket",objTicket);
  try {
    const ticketTransaction = new TicketTransaction({
      seat_no: req.body.seat_no,
      total_price: event.ticket_price * total_seats,
      event_id: req.body.event_id,
      user_id: req.user._id,
      tickets: objTicket
    });
    await ticketTransaction.save();
    res.send(ticketTransaction);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.post("/customer/ticketPayment", async (req, res) => {
  try {
      const sender = req.body.sender
      const receiver = req.body.receiver
      const amount = req.body.amount

      const session = await mongoose.startSession()
      session.startTransaction()

      try {
          const sender = await User.findById(req.body.sender).session(session)
          if (sender.wallet < amount)
              throw new Error(`User ${sender.first_name} you have insufficient balance`)
          else
              sender.wallet = sender.wallet - amount;

          const receiver = await User.findById(req.body.receiver).session(session)
          receiver.wallet = receiver.wallet + amount

          await sender.save()
          await receiver.save()
          await session.commitTransaction()

          return res.json({ sender: sender.first_name, receiver: receiver.first_name, amount: amount, yourBalance: sender.wallet })

      } catch (err) {
          console.log("in abort :", err.message)
          await session.abortTransaction()
      } finally {
          session.endSession()
      }
  } catch (err) {
      console.log("err", err.message)
      return res.send(`Transaction falied`)
  }
})

module.exports = router;
