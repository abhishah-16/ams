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