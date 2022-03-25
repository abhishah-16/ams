const express = require("express")
const router = new express.Router()
const User = require('../models/user')
const Auditorium = require('../models/auditorium')
const { authToken, isAdmin } = require("../middlewares/authRole")
const { sendVerificationRejectedMail, sendVerificationAcceptedMail } = require("../emails/accounts")
const TicketTransaction = require("../models/ticketTransaction")

router.get("/admin/managerList", [authToken, isAdmin], async (req, res) => {
    try {
        let query = req.query.status ? {verificationStatus:req.query.status,role:"manager"} : {} 
        const pendingList = []
        const managerList = await User.find(query)
        for(let manager of managerList){
            const auditorium = await Auditorium.find({ manager_id: manager.id })
            delete auditorium._id
            pendingList.push({manager,auditorium})
        } 
     //const managerList = await  User.aggregate([{$match:{role:"manager",verificationStatus:status}},{$lookup:{from:"auditorium",localField:"_id",foreignField:"manager_id",as:"list"}}])
        res.status(200).send({count:pendingList.length,pendingList})
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/admin/setManagerStatus', [authToken, isAdmin], async (req, res) => {
    try {
        const Updatedmanager = await User.findByIdAndUpdate(req.body.managerId, { verificationStatus: req.body.verificationStatus }, { new: true, runValidators: true })
        if (Updatedmanager) {
            if (Updatedmanager.verificationStatus=="true")
                sendVerificationAcceptedMail(Updatedmanager.email, Updatedmanager.name)
            else
                sendVerificationRejectedMail(Updatedmanager.email, Updatedmanager.name)

            res.status(200).send(Updatedmanager)
        }
        else res.status(404).send("Manager not found..")
    } catch (err) {
        res.status(404).send(err.message)
    }
})

router.get("/admin/acceptedList", [authToken, isAdmin], async (req, res) => {
    try {
        var pendingList = []
        const managerList = await User.find({ verificationStatus: "true", role: "manager" })
        res.status(200).send(managerList)
    } catch (err) {
        res.status(400).send(err.message)
    }
})
router.get("/admin/rejectedList", [authToken, isAdmin], async (req, res) => {
    try {
        var pendingList = []
        const managerList = await User.find({ verificationStatus: "false", role: "manager" })
        res.status(200).send(managerList)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get("/admin/adminDashboard", [authToken, isAdmin], async (req, res) => {
    try {
        res.status(201).send("Admin dashboard")
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get("/admin/removeUser:userId",async(req,res)=>{
    try{
        const user = await User.findByIdAndRemove(req.params.userId)
        await TicketTransaction.deleteMany({user_id:req.params.userId})
        res.status(200).send({message:`User - ${user.name} hase been deleted successfully...`})
    }catch(err){
        res.status(400).send({error:err.message})
    }
})

module.exports = router