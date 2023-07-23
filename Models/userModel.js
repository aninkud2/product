const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:[true, "username is required."]
    },
    email:{
        type: String,
        required:[true, "email is required."],
        unique:true
    },
    password:{
        type:String,
        required:[true, "password is required."]
    },
    customerProduct:[
        {type:mongoose.Schema.Types.ObjectId,
    ref:"product"}
    ],
    token:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    isSuperAdmin:{
        type: Boolean,
        default:false
    },
},{
timestamps: true
})

const userModel = mongoose.model("user", userSchema)
module.exports=userModel;