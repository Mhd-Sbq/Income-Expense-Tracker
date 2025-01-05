const express = require("express")
const connect = require('./connect')

const EntriesRoutes = require('./EntriesRoutes')
const cors = require("cors")



const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())


app.use(EntriesRoutes)

app.listen(PORT,()=>{
    connect.db
    console.log(`Server is running on port ${PORT}`)
})