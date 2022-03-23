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
}

function isValidEventUpdateDate(event_date) {
    var current_date = dateTime.create();
    var event_date = dateTime.create(event_date)

    current_date = current_date.format('Y-m-d');
    event_date = event_date.format('Y-m-d');
    console.log(current_date,event_date)
    if (current_date < event_date)
        return false
}

function convertDate(date) {
    var date = dateTime.create(date)
    date = event_date.format('Y-m-d');
    return date
}

module.exports = { isValidBookingDate, isValidEventUpdateDate ,convertDate}