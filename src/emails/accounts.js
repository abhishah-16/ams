const sgmail = require("@sendgrid/mail")
sgmail.setApiKey(process.env.sendGridApiKey)

const sendWelcomeMail = (email, name) => {
    sgmail.send({
        to: email,
        from: "pateljaykjp1@gmail.com",
        subject: "Thanks for joining us!",
        text: `Welcome to the app ${name} , Let me know how you get along with the app.`
    })
}

const sendCancelationMail = (email, name) => {
    sgmail.send({
        to: email,
        from: "pateljaykjp1@gmail.com",
        subject: "Sorry to see you go!",
        text: `Goodbye ${name}, I hope to see you back sometime soon.`
    })
}

const sendVerificationPendingMail = (email, name) => {
    sgmail.send({
        to: email,
        from: "pateljaykjp1@gmail.com",
        subject: "Regarding verification",
        text: `Welcome ${name} to AMS System, we have received your request, once we verified it we'll let you know.\n Thank you for joining us.`
    })
}

const sendVerificationAcceptedMail = (email, name) => {
    sgmail.send({
        to: email,
        from: "pateljaykjp1@gmail.com",
        subject: "Regarding Accepted Request",
        text: `Welcome again ${name}, we have accepted your request, now you are part of AMS system`
    })
}
const sendVerificationRejectedMail = (email, name) => {
    sgmail.send({
        to: email,
        from: "pateljaykjp1@gmail.com",
        subject: "Regarding Rejected Request",
        text:`Hello ${name}, we have seen your request and sorry to say you that your request is not accepted.\nI hope to see you again , Thank you.`
    })
}
module.exports = {
    sendWelcomeMail,
    sendCancelationMail,
    sendVerificationAcceptedMail,
    sendVerificationPendingMail,
    sendVerificationRejectedMail
}
