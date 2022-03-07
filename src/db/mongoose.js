const mongooese = require("mongoose")
mongooese.connect(process.env.MONGODBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
    //useFindAndModify:false
},()=>{
    console.log("mongodb connected")
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