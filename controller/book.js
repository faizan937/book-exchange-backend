const Book=require("../models/Book");
const User=require("../models/User");

exports.uploadBook=async(req,res)=>{
const book=await Book.create({...req.body,owner:req.user.id});
res.status(201).json(book);

};
exports.getMyBooks=async(req,res)=>{
    const books=await Book.find({owner:req.user.id});
    res.json(books);
};
exports.favoriteBook=async(req,res)=>{
    await User.findByIdAndUpdate(req.user.id,{$addToSet:{favorite:req.params.id}});
    res.json({success:true});
};
exports.searchBook=async (req,res)=>{
    const{title,category,location}=req.query;
    const query={};
    if(title) query.title=new ReqExp(title,"i");
    if (category) query.category=category;
    if (location) query.loction=location;
    const book=await book.find(query)
    res.json(books);
};