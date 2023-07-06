const userModel = require("../Models/userModel")
const jwt =require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

exports.newUser = async (req, res)=>{
    try {
        const {username, email, password}=req.body
        const checkEmail = await userModel.findOne({email:email})
        if(checkEmail){res.status(400).json({message:"email already exist."})}

        //hashed the passwrod
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password, salt)

        const data = {
            username,
            email,
            password:hash,
        }
        const createUser = new userModel(data)

        //generate a token
        const newToken = jwt.sign({
            username,
            password
        }, process.env.JWT_TOKEN,{expiresIn: "1d"})
        createUser.token = newToken
        await createUser.save()
        if(!createUser){
            res.status(400).json({
                status: "Failed.",
                message: "error creating user."
            })
        }else{
            res.status(201).json({
                status: "sucessful.",
                message: "user created sucessfully.",
                data:createUser
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed.",
            message: error.message
        })
    }
}

//signIn 

exports.signIn = async (req, res)=>{
    try {
        const {username, password}=req.body
        const check = await userModel.findOne({username:username})
        if(!check){res.status(400).json({message:"wrong username."})}

        const isPassword = await bcryptjs.compare(password, check.password)
        if(!isPassword){res.status(400).json({message:"wrong password format"})}

        //generate login token
        const createToken = jwt.sign({
            username,
            password
        }, process.env.JWT_TOKEN,{expiresIn: "1d"})
        check.token = createToken
        await check.save()
        res.status(201).json({
            status: "sucessful.",
            message: "loged in sucessful.",
            data:check
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed.",
            message: error.message
        })
    }
}