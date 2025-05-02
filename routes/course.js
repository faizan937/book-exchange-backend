const express=require("express");
const Course=require("../model/Course");
const router=express.Router();
//Create Course
router.post("/create",async (req,res)=>{
    const{name,admin}=req.body;
    const course=new Course({name,admin});
    await course.save();
    res.json(course);

});
//Get Courses
router.get("/",async (req,res)=>{
    const courses=await Course.find().populate("admin students");
    res.json(courses);
});
module.exports=router;