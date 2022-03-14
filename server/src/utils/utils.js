var dateTime = require('node-datetime');

function isValidBookingDate(date) {
    var current_date = dateTime.create();
    var bookingDate = dateTime.create(date)
    current_date = current_date.format('Y-m-d');
    bookingDate = bookingDate.format('Y-m-d');
    if (current_date == bookingDate)
        return "Cant select current date"
    else if (current_date > bookingDate)
        return "cant select past date"
    else return "booked"


    //console.log("bookingDate", date, "cd", current_date)
}
module.exports = { isValidBookingDate }