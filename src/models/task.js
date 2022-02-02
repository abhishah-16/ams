const mongooese = require("mongoose")
const validator = require("validator")
const task = mongooese.model('Task',{
    description : {
        type:String,
        required:true,
        trim:true
    },
    completed : {
        type:Boolean,
        default:false
    }
})
module.exports = task