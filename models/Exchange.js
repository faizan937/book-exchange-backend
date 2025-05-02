const mongoose=require("mongoose");
const exchangeSchema=new mongoose.Schema;({
    bookrequested:{type:mongoose.Schema.Type.objectId,ref:"Book"},
    bookOffered:{type:mongoose.Schema.Type.objectId,ref:"Book"},
    requester:{type:mongoose.Schema.Type.objectId,ref:"User"},
    responder:{type:mongoose.Schema.Type.objectedId,ref:"User"},
    status:{type:String,enum:["pending","accepted","declined"],default:"pending"},
})
module.exports=mongoose.model("Exchange",exchangeSchema);