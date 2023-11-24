const { Schema, default: mongoose, model } = require('mongoose');


const mealSchema = new Schema({});


const meals = model("meals", mealSchema);
module.exports = meals;
