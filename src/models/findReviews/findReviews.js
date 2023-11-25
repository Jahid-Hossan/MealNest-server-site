const { Schema, default: mongoose, model } = require('mongoose');


const reviewsSchema = new Schema({});


const reviews = model("reviews", reviewsSchema);
module.exports = reviews;