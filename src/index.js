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
