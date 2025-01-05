const express = require("express")
const database = require('./connect')

const ObjectId = require("mongodb").ObjectId

require("dotenv").config({path : './config.env'})

let EntriesRoutes = express.Router()

//get all data from the collection entries
EntriesRoutes.route("/entries").get( async(request,response) =>{
    let db = database.getDb()
    let data = await db.collection("Entries").find({}).toArray()

    if (data.length > 0){
        response.json(data)   
    }else{
        throw new Error("Data was not found : (");       
    }
})


//get one data from the collection entries
EntriesRoutes.route("/entries/:id").get( async(request,response) =>{
    let db = database.getDb()
    let data = await db.collection("Entries").findOne({_id: new ObjectId(request.params.id)})
    
    if (Object.keys(data).length > 0){
        response.json(data)   
    }else{
        throw new Error("Data was not found : (");       
    }
})

//create one data to the collection entries

EntriesRoutes.route("/entries").post( async(request,response) =>{
    let db = database.getDb()

    let mongoObject = {
        Date : request.body.Date,
        Ledger:request.body.Ledger,
        Receipt:request.body.Receipt,
        Payment:request.body.Payment,
        Notes:request.body.Notes,
    }


    let data = await db.collection("Entries").insertOne(mongoObject)

    response.json(data)   
    
})

//update one data to the collection entries
EntriesRoutes.route("/entries/:id").put( async(request,response) =>{
    let db = database.getDb()

    let mongoObject = {
        $set:{
            Date : request.body.Date,
            Ledger:request.body.Ledger,
            Receipt:request.body.Receipt,
            Payment:request.body.Payment,
            Notes:request.body.Notes,
        }   
    }

    let data = await db.collection("Entries").updateOne({_id : new ObjectId(request.params.id)},mongoObject)
    response.json(data)   
    
})

//delete one data to the collection entries
EntriesRoutes.route("/entries/:id").delete( async(request,response) =>{
    let db = database.getDb()

    let data = await db.collection("Entries").deleteOne({_id : new ObjectId(request.params.id)})
    response.json(data)   
    
})


module.exports = EntriesRoutes
