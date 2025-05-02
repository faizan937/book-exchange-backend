const express=require("express");

const Schedule=require("../model/Schedule");
const router=express.Router();
//Create Schedule
router.post("/create",async(req,res)=>{
    const {course,day,time,location}=req.body;
    const schedule=new Schedule({course,day,time,location});
    await schedule.save();
    res.json(schedule);
});
//Get Schedule
router.get("/",async(req,res)=>{
    const schedules=await Schedule.find().populate("course");
    res.json(schedules);
});
module.exports=router;