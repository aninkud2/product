const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
   
    productName:String,
    productAmount:Number,
    productQty:Number,
    createdBy:String,
    UpdatedBy:String,
 customer:{type:mongoose.Schema.Types.ObjectId,
ref:"user"}

},{timeStamp:true})
const productModel=mongoose.model("product",productSchema)
module.exports=productModel  