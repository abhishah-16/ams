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
    },
    owner:{
        type:mongooese.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})
module.exports = task