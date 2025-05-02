const cloudinary=require("cloudinary").v2;
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    app_key:process.env.CLOUDINARY_APP_KEY,
    app_secret:process.env.CLOUDINARY_APP_SECRET,

});
module.exports=cloudinary;