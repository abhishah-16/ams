const mongooese = require("mongoose")

// mongooese.connect('mongodb://127.0.0.1:27017/AMS-test2',{
//     useNewUrlParser:true,
//     // useCreateIndex:true
//     //useFindAndModify:false
// })
mongooese.connect('mongodb+srv://ams_developers:41CVNV34n7lGLzIL@cluster0.isj4t.mongodb.net/AMS?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
    //useFindAndModify:false
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