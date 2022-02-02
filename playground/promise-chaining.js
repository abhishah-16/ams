require('../src/db/mongoose')
const User = require("../src/models/user")
const Task = require("../src/models/task")

// use async/await to do same work as below
const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age:age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('61fa0f5874dae7f086db5239',2)
.then((count)=>{
    console.log(count)
})
.catch((e)=>{
    console.log(e)
})


// //61fa0f5874dae7f086db5239
// User.findByIdAndUpdate('61fa0f5874dae7f086db5239',{age:1})
// .then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// })
// .then((count)=>{
//     console.log(count)
// })
// .catch((e)=>{
//     console.log(e)
// })

//61fa0d531c299e0729780309

// Task.findByIdAndDelete('61fa0d531c299e0729780309')
// .then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:true})
// })
// .then((count)=>{
//     console.log(count)
// })