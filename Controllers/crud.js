const userModel = require("../Models/userModel")
const productModel=require("../Models/product")
const jwt =require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const iplocation = require('iplocation');

exports.getOne=async (req,res)=>{
    try {
       


        const oneUser=await userModel.findById(req.params.id).populate("customerProduct")
    if(!oneUser){res.status(400).json("this user doesnt exist")}

else{
    res.status(200).json(
        {data:oneUser,

        }
    )
}
        
    } catch (error) { 
        res.status(400)
        .json(error.message)
    }
}

//all user
exports.getAll=async (req,res)=>{
    try { const authId=req.params.authId
        const autheticatedUser=await userModel.findById(req.params.id)

        const allUser=await userModel.find().populate("customerProduct")
    if(!allUser){res.status(400).json("this user doesnt exist")}

else{ 
    res.status(200).json(
        {data:allUser

        }
    )
}
        
    } catch (error) {
        res.status(400)
        .json(error.message)
    }
}
//update user
exports.update=async (req,res)=>{

    try {    const email=req.body.email
        const username=req.body.username
            const id=req.params.id
        const updateUser=await userModel.findByIdAndUpdate(id,{username:username ,email:email},{new:true})
    if(!updateUser){res.status(400).json("this user cannot be updated")}

else{
    res.status(200).json(
        {data:updateUser

        }
    )
}
        
    } catch (error) {
        res.status(400)
        .json(error.message)
    }
}

//update user
exports.deleteUser=async (req,res)=>{

 try {
   const id=req.params.id
        const deleteUser=await userModel.findByIdAndDelete(id)
    if(!deleteUser){res.status(400).json("this user cannot be deleted")}

else{
    res.status(200).json(
        {data:`${deleteUser.username} has been deleted`

        }
    )
}
        
    } catch (error) {
        res.status(400)
        .json(error.message)
    }
}
