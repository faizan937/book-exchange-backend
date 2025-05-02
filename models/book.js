const mongoose=require("mongoose");
const bookSchema=new mongooseSchema;({
    title:String,
    author:String,
    gener:String,
    description:String,
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    status: {type:String,enum:["available","lent","borrowed"],default:"avalaible"},
    location:String,
    imageUrl:String,
})
module.exports=mongoose.model("Book",bookSchema);