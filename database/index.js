const mongoose = require('mongoose');
const { MONGODB_CONNECTION_STRING } = require('../config/index');
const dbConnect = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', );
    
    
    try {
        console.log("here----------",MONGODB_CONNECTION_STRING)
        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1); // Stop the server if the database connection fails
    }
};

module.exports = dbConnect;