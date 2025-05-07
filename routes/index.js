const express=require("express");
const authcontroller=require("../controllers/authController");
const router=express.Router();

//user
//register
router.post("/register",authcontroller.register);
//login
router.post("/login",authcontroller.login);

//logout
//refresh

//blog
//CRUD
//create
//read all blogs
//read blog id
//update
//delete

//comment
//create comment
//reate comment by blog id
module.exports=router;