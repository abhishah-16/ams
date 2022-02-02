const mongooese = require("mongoose")
const validator = require("validator")
mongooese.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    // useCreateIndex:true
})

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

const t1 = new task({})
t1.save()
.then(()=>{
    console.log(t1)
})
.catch((error)=>{
    console.log(error)
})

// const User = mongooese.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
    
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Invalid Email..')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(v){
//             if(v<0) throw new Error('Age must be a positive number')
//         }
//     },
//     password:{
//         type:String,
//         trim:true,
//         required:true,
//         minlength:7,
//         validate(v){
//             if(v.toLowerCase().includes("password")) throw new Error("can't give 'password' in password")
//         }
//     }
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