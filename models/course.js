const mongoose=require("mongoose");

const CourseSchema=new mongoose.Schema({
    name:String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students:[{type:mongoose.Schema.Types.objectId,ref:"User"}],
});
module.exports=mongoose.model("Course",CourseSchema);