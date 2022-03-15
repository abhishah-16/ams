const express = require("express")
const app = express()
require('./db/mongoose')
const port = process.env.PORT ;
// console.log("token:",process.env.JWTSECRETE)
const userRouter = require('./routers/userRoute') 
const customerRoute = require("./routers/customerRoute")
const adminRoute = require('./routers/adminRoutes')
const managerRoute = require('./routers/managerRoutes')
const organizerRoute = require("./routers/organizerRoute")
const maintainanceStatus = false
const swaggerJsDOc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./routers/swagger.json")
const { application, urlencoded } = require("express")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const swaggerOptions={
    swaggerDefinition:{
        info:{
            title:"Auditorium Management System API",
            description:"APIs for manage auditorium details",
            conatact:{
                name:"Jay patel & Ajay Pipaliya"
            },
            server:["http://localhost:5000"]
        }
    },
    components: {
        securitySchemes: {
          jwt: {
            type: "http",
            scheme: "bearer",
            in: "header",
            bearerFormat: "JWT"
          },
        }
      }
      ,
      security: [{
        jwt: []
      }],
    swagger: "2.0",
    apis:["./routers/*.js"]
}
const swaggerDocs = swaggerJsDOc(swaggerOptions)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDoc))
app.use((req,res,next)=>{
    if(maintainanceStatus)
        res.status(504).send("Currently this site is under maintainance , please try again some time.")
    next()
})  
                
app.use(express.json())
app.use(userRouter)
app.use(adminRoute)
app.use(managerRoute)
app.use(organizerRoute)
app.use(customerRoute)

app.get("/", (req, res) => {
    res.send("welcome to AMS system")
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