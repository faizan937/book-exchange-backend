const express =require("express");
const {createEmployee,getEmployees }=require("../controllers/EmployeeController");
const router=express.Router();
router.post("../employees",createEmployee);
router.get("../employees",getEmployees);
module.exports=router;
