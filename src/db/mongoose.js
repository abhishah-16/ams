const mongooese = require("mongoose")
mongooese.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    // useCreateIndex:true
})






















// const t1 = new task({})
// t1.save()
// .then(()=>{
//     console.log(t1)
// })
// .catch((error)=>{
//     console.log(error)
// })



// const me = new User({
//     name:" jaypatelk",
//     email:" patelJAYkjp@gmail.co",
//     age:21,
//     password:"rd@123"

// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })