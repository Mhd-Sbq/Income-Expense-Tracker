
const { MongoClient, ServerApiVersion } = require('mongodb');

require("dotenv").config({path:"./config.env"})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let EntriesDataBase

module.exports ={
    connectToServer:() => {
        EntriesDataBase = client.db("Accounts")
    },
    getDb : () => {
        EntriesDataBase = client.db("Accounts")
        return EntriesDataBase
    }
}
