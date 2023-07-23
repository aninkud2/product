const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.configDotenv()
const app = require("./app")

const DB = process.env.db

mongoose.connect(DB
    ).then(()=>{
        console.log("Database is Connected")
    }).then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("server is connected.")
        })
    })