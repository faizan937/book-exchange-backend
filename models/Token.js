const mongoose = require("mongoose");

const TokenSchema=new mongoose.Schema({
    token:{type:String,required:true},
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:"Users"}
},
{timestamps:true}

);
module.exports=mongoose.model("Token",TokenSchema);

