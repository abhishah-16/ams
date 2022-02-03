const express = require("express")
const app = express()
require('./db/mongoose')
const port = process.env.PORT || 3000;
const userRouter = require('./routers/userRoute')
const taskRouter = require('./routers/taskRoute')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.get("/", (req, res) => {
    res.send("welcome to task manager")
})

app.listen(port, () => {
    console.log("server is running on port : ", port)
})

// const jwt = require('jsonwebtoken')
// const myf = async (password) => {
//     let token = await jwt.sign({_id:'jay patel'},'thisismynewsecretgenerator',{expiresIn:'1 seconds'})
//     console.log("token :",token)
//     token = await jwt.verify(token,'thisismynewsecretgenerator')
//     console.log("token :",token._id)    
// }  
// myf()