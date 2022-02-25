const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isManager } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts") 

router.get("/manager/auditoriumDetails",[authToken,isManager],async(req,res)=>{
    console.log("manager : ",req.user._id,req.user.name)
    const auditoriumDetails = await Auditorium.find({manager_id:req.user._id})
    res.send(auditoriumDetails)
})

module.exports= router