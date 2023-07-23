const productModel=require("../Models/product")
const userModel=require("../Models/userModel")
const jwt=require("jsonwebtoken")
exports.createProduct=async(req,res)=>{
 
    
    
try {
    
    
     //get the user to create the product
     const user=await userModel.findById(req.params.id)
     if(!user){
       return  res.status(403).json("user doesnt exist")
     }
     //check if the user is sign in using token
     else{const token=user.token
     await jwt.verify(token,process.env.JWT_TOKEN
     )
    const data={
    productName:req.body.productName,
    productAmount:req.body.productAmount,
    productQty:req.body.productQty,
    createdBy:user.username
    }

    const newProduct=await productModel.create(data)
    //newProduct.customer=user
    
   newProduct.save()
//    await user.save()
//    user.customerProduct.push(newProduct)
  if(!newProduct){
   return res. json("unable to create product")
  }
  
   
   return res.status(200).json({
        message:"success",
        data:newProduct
    })

     }
                  
} catch (error) {
  return res.json( error.message)
    
}
}
//purchase product
exports.buyProduct=async(req,res)=>{
    try {
        
    //get the user to create the product
   
  
 const user=await userModel.findById(req.params.id)
 const token=user.token
 //check if the user is sign in
 await jwt.verify(token,process.env.JWT_TOKEN)
        const productName=req.body.productName
        const productToPurchase=await productModel.findOne({productName})
        if(productToPurchase.productQty<=0){
           return (`${productToPurchase.productName} is out of stock`)
          }
      productToPurchase.customer=user

      productToPurchase.save()
      
   
    user.customerProduct.push(productToPurchase)
    
   
  productToPurchase.productQty=productToPurchase.productQty-1
 
   await user.save()  
       
        res.status(200).json({
            message:"success",
            data:`${user.username} has succesfully purchased ${productToPurchase.productName}`,
            
        })
    } catch (error) {
        res.status(400).json({
            "error":error.message
        })
        
    }
    }
    
//update product
exports.updateProduct=async(req,res)=>{
    try {
           //get the user to create the product
    const user=await userModel.findById(req.params.id)
    const token=user.token
    //check if the user is sign in
    await jwt.verify(token,process.env.JWT_TOKEN)
        const data={
        productName:req.body.productName,
        productAmount:req.body.productAmount,
        productQty:req.body.productQty ,
        UpdatedBy:user.username    
    }

        const productId=req.params.productId
     const update=   await productModel.findByIdAndUpdate(productId,data,{new:true})

if(!update){
    res.json("unable to update product")
}
else{
    res.json(
        {
            message:"product updated succesfully",
            data : update
        }
    )
}
        
    } catch (error) {
        res.json(error.message)
        
    }

}

  //delete product
  exports.deleteProduct=async(req,res)=>{
    try {
         //get the user to create the product
         const user=await userModel.findById(req.params.id)
    const token=user.token
    //check if the user is sign in
    await jwt.verify(token,process.env.JWT_TOKEN)

        const productId=req.params.productId
     const deleteP=   await productModel.findByIdAndDelete(productId)

if(!deleteP){
    return res.json("unable to delete product")
}

user.customerProduct.pull(deleteP)
await  user.save()
    res.json(
        {
            message:` ${deleteP.productName}deleted` ,
            
        }
    )

        
    } catch (error) {
        res.json(error.message)
        
    }

}


//all products
exports.getAllProducts=async (req,res)=>{
    try { const authId=req.params.authId
        const autheticatedUser=await userModel.findById(req.params.id)
        const token=autheticatedUser.token
        //check if the user is sign in
        await jwt.verify(token,process.env.JWT_TOKEN)
        const allProducts=await productModel.find()
    if(!allProducts){res.status(400).json("No available products")}

else{ 
    res.status(200).json(
        {data:allProducts

        }
    )
}
        
    } catch (error) {
        res.status(400)
        .json(error.message)
    }
}