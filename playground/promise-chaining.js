require('../src/db/mongoose')
const User = require("../src/models/user")
const Task = require("../src/models/task")

//61fa0f5874dae7f086db5239

User.findByIdAndUpdate('61fa0f5874dae7f086db5239',{age:1})
.then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
})
.then((count)=>{
    console.log(count)
})
.catch((e)=>{
    console.log(e)
})
