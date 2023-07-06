const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.configDotenv({path: './Config/config.env'})
const app = require("./app")

const DB = process.env.DATABASE

mongoose.connect(DB
    ).then(()=>{
        console.log("Database is Connected")
    }).then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("server is connected.")
        })
    })