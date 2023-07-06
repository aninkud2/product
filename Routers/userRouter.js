const express = require("express")
const {newUser, signIn}= require("../Controllers/userControllers")
const router = express.Router()
router.route('/signup').post(newUser)
router.route('/login').post(signIn)
module.exports = router