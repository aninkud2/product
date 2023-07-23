const userModel = require("../Models/userModel")
const jwt =require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const emailSender = require("../utils/email")

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
        const createUser = await new userModel(data)

        //generate a token
        const newToken = jwt.sign({
            username,
            password
        }, process.env.JWT_TOKEN,{expiresIn: 12}) 
        createUser.token = newToken

        const VerifyRoute = `${req.protocol}://${req.get("host")}/api/verifyUser/${createUser._id}`;
        const message = `thanks for signing up as an Admin ${createUser.username} Kindly use the link to verify your account  ${VerifyRoute}/${createUser.token}  Kindly note that this link will expire in #0 mins`;
        emailSender({
            from:process.env.USER,
            email: createUser.email,
            subject: "Verify your Account",
            message,
        }); 

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
       res.json(error.message)
        
    }
}

exports.Verify = async(req,res)=>{
    try{
        const id = req.params.id;
        
        const admin = await userModel.findById(id)
       
        await userModel.findByIdAndUpdate(
            admin.id,
            {
                isVerified : true,
                
            },
            {
                new: true
            }
        )

        res.status(201).json({
            message: "You have been verified "
        });
    }catch(e){
        res.status(400).json({
        message: e.message
       });
    }
}    

//signIn 

exports.signIn = async (req, res)=>{
    try {
        const {username, password}=req.body
        const check = await userModel.findOne({username:username})
        if(!check){res.status(400).json({message:"wrong username."})}

       const isPassword = await bcryptjs.compare(password, check.password)
         if(!isPassword) { return res.status(400).json({message:"wrong password format"})}
       
        //generate login token  
       else{ const createToken = jwt.sign({
            username,
            password
        }, process.env.JWT_TOKEN,{expiresIn: "1d"})
        check.token = createToken
        await check.save()
        res.status(201).json({
            status: "sucessful.",
            message: "loged in sucessful.",
            data:check
        })}
    } catch (error) {
        
            message: error.message
        }
    
}


exports.changepassword = async (req, res)=>{
    try {
       const {password}=req.body
        // const userId = req.params.userId
        // const userPassword = await userModel.findById(req.params.id)
        // const isPassword = userPassword.password
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password, salt)
        const {email}=req.body
        const existingUser=await userModel.findOne(email)
        const token=existingUser.token
        jwt.verify(token,process.env.JWT_TOKEN,(err,data)=>{
            if(err){
                res.json("the link has expired")
            }
            else{
                return data
            }
            
                    })
        await userModel.findByIdAndUpdate(req.params.id,{password:hash}, {new:true})
        res.status(201).json({
            status:"Sucessful.",
            message:"sucessfuly change password."
        })
    } catch (error) {
         error.message
        
    }
}

exports.forgotPassword = async(req, res)=>{
    try {
        const {email}=req.body
        const checkEmail = await userModel.findOne({email:email})
        if(!checkEmail)return res.status(400).json({message: "no email"})

        const myToken = jwt.sign({
            id: checkEmail._id
        },process.env.JWT_TOKEN,{expiresIn: 300000})
  

        const VerifyLink=`${req.protocol}://${req.get("host")}/api/changePassword/${checkEmail._id}/${myToken}`;
    console.log(req.protocol)
    console.log(req.get("host"))
        const message = `please ${checkEmail.username} Kindly use the link to reset  your account password link expires in 1minute ${VerifyLink} `;
        emailSender({
            from:process.env.USER,
            email: checkEmail.email,
            subject: "reset your pasword",
            message,
        });
        res.status(201).json({
            status: "sucessful.",
            message: "email has been sent",
        })

    } catch (error) {
        res.status(500).json({
            status: "Failed.",
            message: error.message
        })
    }
}

//make admin
exports.CreateAdmin=async(req,res)=>{
    try {
        const id=req.params.id
        const makeadmin=await userModel.findByIdAndUpdate(id,{
            isAdmin:true
        })
        if(!makeadmin){
            res.json(`unable to make ${makeadmin.username} an admin`)
        }
        else{
            res.json(`${makeadmin.username} has been made an admin`)
        }
        
    } catch (error) { 
        res.status(400).json(error.message)
    }
}  