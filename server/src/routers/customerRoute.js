const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const TicketTransaction = require("../models/ticketTransaction");
const { authToken, isUser } = require("../middlewares/authRole");
const AuditoriumBooking = require("../models/auditoriumBooking");
const time = require("../models/alllSlots.json");
const { ObjectId } = require("mongodb");

router.post(
  "/customer/ticketBookingPayment/:status",
  [authToken, isUser],
  async (req, res) => {
    try {
      const event_id = req.body.event_id;
      const cTrans_id = req.body.cTrans_id;
      const amount = req.body.amount;
      const sender = req.user._id;
      const { status, seat_numbers } = await TicketTransaction.findById(
        req.body.cTrans_id
      );
      console.log("status", status);
      if (status == "Confirmed") throw new Error("Payment already completed");
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const { total_price } = await TicketTransaction.findById(cTrans_id);

        if (req.params.status == "Confirmed") {
          console.log("2");
          if (amount < total_price || amount > total_price)
            throw new Error(`User ${sender.name} you have enter wrong amount`);
          else if (amount == total_price) {
            for (const s of seat_numbers) {
              const ticket_price = total_price / seat_numbers.length;
              console.log("tp", ticket_price);
              TicketTransaction.findOneAndUpdate(
                { _id: cTrans_id },
                { $push: { tickets: { t_price: ticket_price, seat_no: s } } },

                function (error, success) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(success);
                  }
                }
              );
            }
            await TicketTransaction.findByIdAndUpdate(cTrans_id, {
              status: "Confirmed",
            });
            await session.commitTransaction();
            return res.json({ amount, status: req.params.status });
          }
        } else {
          console.log("falied payment");
          await TicketTransaction.findOneAndUpdate(
            { _id: req.body.cTrans_id },
            { seat_numbers: 0, status: "Failed" }
          );
          await session.commitTransaction();
          return res.json({
            amount,
            status: "Failed",
            message: "Booking has been cancel",
          });
        }
      } catch (err) {
        // const bookingConfirmation = new AudiBookingPayment({ user_id: sender, event_id, amount, status: "Pending" })
        // await bookingConfirmation.save()
        console.log("in abort :", err.message);
        await session.abortTransaction();
        return res.json({ amount, status: "Pending", error: err.message });
      } finally {
        session.endSession();
      }
    } catch (err) {
      console.log("err", err.message);
      return res.send({ error: err.message });
    }
  }
);

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
    let match = {};
    if (req.query._id) match = { _id: ObjectId(req.query._id) };
    else match = req.query ? req.query : {};
    console.log("query", match);
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

router.post(
  "/customer/ticketBooking",
  [authToken, isUser],
  async (req, res) => {
    try {
      const event = await AuditoriumBooking.findById(req.body.event_id);
      if (!event) throw new Error("can't find event");
      const total_seats = req.body.seat_numbers.length;
      const ticketTransaction = new TicketTransaction({
        seat_numbers: req.body.seat_numbers,
        total_price: event.ticket_price * total_seats,
        event_id: req.body.event_id,
        user_id: req.user._id,
      });
      const bookedDetails = await ticketTransaction.save();
      res.status(200).send({
        cTrans_id: bookedDetails._id,
        amount: bookedDetails.total_price,
        message: "Please make payment first to confirm your booking.",
      });
    } catch (err) {
      res.status(404).send({ error: err.message });
    }
  }
);

// router.post('/customer/ticket/transactionUpdate', [authToken, isUser], async (req, res) => {
//   try {
//     let tTransaction = await TicketTransaction.findById(req.body.cTrans_id);
//     if(!tTransaction)
//      throw new Error("Invalid transaction id")
//     if (tTransaction.status == "confirmed") {
//       throw new Error("Payment is already done")
//     }
//     else {
//       const event = await AuditoriumBooking.findById (req.body.event_id);
//       console.log("even",event)
//       if(!event)
//         throw new Error("event or transaction not found2")
//       for (const s of tTransaction.seat_numbers) {
//         TicketTransaction.findOneAndUpdate(
//           { _id: req.body.cTrans_id },
//           { $push: { tickets: { "t_price": event.ticket_price, "seat_no": s } } },

//           function (error, success) {
//             if (error) {
//               console.log(error);
//             } else {
//               console.log(success);
//             }
//           });
//       }
//       tTransaction = await TicketTransaction.findByIdAndUpdate({ _id: req.body.cTrans_id }, {
//         $set: {
//           status: "confirmed"
//         }
//       }, { new: true })

//     }
//     res.status(200).send({ message: "Payment Done!" })
//   } catch (err) {
//     res.status(400).send({ error: err.message });
//   }
// })

router.get(
  "/customer/pastEventBooking",
  [authToken, isUser],
  async (req, res) => {
    try {
      const pastEvents = await TicketTransaction.aggregate([
        { $match: { user_id: req.user._id } },
        //{$project}
      ]);
      res.status(200).send(pastEvents);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
);

module.exports = router;
