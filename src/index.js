const express = require("express")
const app = express()
require('./db/mongoose')
const port = process.env.PORT || 3000;
const userRouter = require('./routers/userRoute')
const taskRouter = require('./routers/taskRoute')

const maintainanceStatus = false
app.use((req,res,next)=>{
    if(maintainanceStatus)
        res.status(504).send("Currently this site is under maintainance , please try again some time.")
    next()
})  

                
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.get("/", (req, res) => {
    res.send("welcome to task manager")
})

app.listen(port, () => {
    console.log("server is running on port : ", port)
})

// // make relationship between user and task
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async ()=>{
//     const user = await User.findById('61fba5d452712317ea6a0ea2')
//     await user.populate('tasks') //.execPopulate()
//     console.log(user.tasks)
// }
// main()