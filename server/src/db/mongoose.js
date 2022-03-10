const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
    //useFindAndModify:false

})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err to connect ",err)
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