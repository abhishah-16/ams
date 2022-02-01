const mongooese = require("mongoose")
mongooese.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    // useCreateIndex:true
})

const task = mongooese.model('Task',{
    description : {
        type:String
    },
    completed : {
        type:Boolean
    }
})

const t1 = new task({description:"go to bank for money deposite",completed:false})
t1.save()
.then(()=>{
    console.log(t1)
})
.catch((error)=>{
    console.log(error)
})
// const User = mongooese.model('User',{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number
//     }
// })

// const me = new User({name:"jay",age:21})

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })