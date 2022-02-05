const sgmail = require("@sendgrid/mail")
const sendGridApiKey = "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"

sgmail.setApiKey(sendGridApiKey)

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
        from: "pateljaykjp1@gmailc.com",
        subject: "Regarding Rejected Request"
    })
}
module.exports = {
    sendWelcomeMail,
    sendCancelationMail,
    sendVerificationAcceptedMail,
    sendVerificationPendingMail,
    sendVerificationRejectedMail
}
