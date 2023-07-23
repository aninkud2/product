const express = require("express")
const route = require("./Routers/userRouter")

const app =express()

app.use(express.json())
app.use( route)
app.get("/",(req,res)=>{ 
    res.send("welcome  to my page ")
})

module.exports = app