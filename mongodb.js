// CRUD OPERATIONS
//const mongodb = require('mongodb')
//const mongoClient = mongodb.MongoClient
const { MongoClient,ObjectID, ObjectId} = require('mongodb')

const url = "mongodb://127.0.0.1:27017"
const dbname = "task-manager"

const id = new ObjectId()
//console.log(id.getTimestamp())
MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error)
        return console.log("Unable to connect to database")
    const db = client.db(dbname)
    // db.collection('users').findAll({name:"dax"},(err,res)=>{
    //     console.log(res)
    // })

    // db.collection('users').find({id:71}).toArray((err,res)=>{
    //     console.log(res[1])
    // })

    db.collection('users').find({address:"anand , gujarat"}).toArray((err,count)=>{
        for(let i=0;i<count.length;i++)
            console.log(count[i].name)
    })

    // db.collection('users')
    // .insertMany([
    //     { name: "dax1", id: 71, address: "anand , gujarat" },
    //     { name: "dax2", id: 71, address: "anand , gujarat" },
    //     { name: "dax3", id: 71, address: "anand , gujarat" }],
    //     (error, result) => {
    //     if (error)
    //         return console.log("Error in inserting data : ", err)
    //     else
    //         return console.log("Result : ", result)
    // })
    // db.collection('task')
    // .insertMany([
    //     { description :"clean house ",status:"completed" },
    //     { description :"goto school ",status:"notcompleted" }

    // ],
    //     (error, result) => {
    //     if (error)
    //         return console.log("Error in inserting data : ", err)
    //     else
    //         return console.log("Result : ", result)
    // })
})
