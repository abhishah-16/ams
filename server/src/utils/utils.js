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
    //var current_date = dateTime.create();
    let current_date = Date.now()
    current_date =  new Date(current_date) 
    //var event_date = dateTime.create(event_date)
    event_date = new Date(event_date)
   // current_date = current_date.format('Y-m-d');
    //event_date = event_date.format('Y-m-d');
    const diff = (current_date.getTime() - event_date.getTime())/(1000 * 60 * 60 * 24)
    console.log("date diff : ",diff,current_date,event_date)
    if (diff > 2)
        return false
}

function convertDate(date) {
    var date = dateTime.create(date)
    date = event_date.format('Y-m-d');
    return date
}

module.exports = { isValidBookingDate, isValidEventUpdateDate ,convertDate}