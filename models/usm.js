const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{type :String,enum: ["admin","student",], default:"student"},

});
module.exports=mongoose.model("Usm",UserSchema);