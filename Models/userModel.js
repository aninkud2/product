const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required:[true, "username is required."]
    },
    email:{
        type: String,
        required:[true, "email is required."],
        unique:true
    },
    password:{
        type: String,
        required:[true, "password is required."]
    },
    token:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default:false
    },
},{
timestamps: true
})

const userModel = mongoose.model("user", userSchema)
module.exports=userModel;