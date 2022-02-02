// CRUD OPERATIONS
//const mongodb = require('mongodb')
//const mongoClient = mongodb.MongoClient
const { MongoClient,ObjectID, ObjectId, Db} = require('mongodb')
const { promises } = require('nodemailer/lib/xoauth2')

const url = "mongodb://127.0.0.1:27017"
const dbname = "task-manager"

const id = new ObjectId()
//console.log(id.getTimestamp())
MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error)
        return console.log("Unable to connect to database")
    const db = client.db(dbname)
    //***********************DELETE OPERATION************************************************* */
    db.collection("users").deleteMany({name:"dax3"})
    .then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    //***********************UPDATE OPERATION************************************************* */
    // we have used promises in update documents
    // db.collection("users").updateMany({age:0},{
    //     // $set:{
    //     //     name:"jay",
    //     //     age:20
    //     // }
    //     $inc:{
    //         age:20
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //***********************READ OPERATION************************************************* */
    // db.collection('users').findAll({name:"dax"},(err,res)=>{
    //     console.log(res)
    // })

    // db.collection('users').find({id:71}).toArray((err,res)=>{
    //     console.log(res[1])
    // })

    // db.collection('users').find({address:"anand , gujarat"}).toArray((err,count)=>{
    //     for(let i=0;i<count.length;i++)
    //         console.log(count[i].name)
    // })

    //***********************CREATE OPERATION************************************************* */

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
