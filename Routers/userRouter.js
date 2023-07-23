const express = require("express")
const {newUser, signIn,Verify,changepassword,forgotPassword,CreateAdmin}= require("../Controllers/userControllers")
const router = express.Router()
router.route('/signup').post(newUser)
router.route('/login').post(signIn)
router.route('/verifyUser/:id').post(Verify)
router.route('/makeadmin/:id').post(CreateAdmin)
router.route('/changePassword/:id').post(changepassword)
router.route('/reset').post(forgotPassword)
router.route( "/changePassword/:id/:myToken").post(changepassword)
const{isAdminauthorized,isSuperAdminauthorized}=require("../Controllers/auth")


//crud operations 
 
//get a single user
const {getOne,getAll,update,deleteUser}=require("../Controllers/crud")
router.get("/user/:id",getOne)
//router.get("/allusers/:id",isAdminauthorized,getAll)
router.route("/allusers/:id").get(getAll)
router.patch("/updateusers/:id",update)

router.delete("/deleteusers/:id",deleteUser)


// product categories
 
const{createProduct,updateProduct,deleteProduct,getAllProducts,buyProduct}=require("../Controllers/product")
router.route("/user/:id/Product").post(createProduct)
router.route("/user/:id/updateProduct/:productId").patch(isAdminauthorized,updateProduct)
router.route("/user/:id/updateProduct/:productId").delete(isAdminauthorized,deleteProduct)
router.route("/allproducts").get(getAllProducts)
router.route("/:id/buyproducts").post(buyProduct)
module.exports = router  