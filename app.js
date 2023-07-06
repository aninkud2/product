const express = require("express")
const route = require("./Routers/userRouter")

const app =express()

app.use(express.json())
app.use('/api', route)
app.get("/",(req,res)=>{
    res.send("welcome message")
})

module.exports = app