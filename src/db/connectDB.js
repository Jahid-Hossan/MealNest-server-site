const mongoose = require("mongoose");
require("dotenv").config();



const connectDB = async () => {
    console.log("connectting to database");
    const mongoURI = process.env.DB_URI;

    await mongoose.connect(mongoURI, { dbName: process.env.DB_NAME });
    console.log("connected to database");
};


module.exports = connectDB