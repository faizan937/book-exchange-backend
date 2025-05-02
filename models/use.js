const mongoose=require("mongoose");
const userSchema=new mongoose.Schema;({
name:String,
email:{type:String,unique:true},
password:String,
location:String,
favouriteBook:[{type:mongoose.Schema.Types.ObjectId,ref:"Book"}],
books:[{type:mongoose.Schema.Types.ObjectId,ref:"book"}]
});
module.exports=mongoose.model("User", userSchema);