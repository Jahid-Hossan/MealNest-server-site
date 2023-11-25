const { Schema, default: mongoose, model } = require('mongoose');


const mealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    adminName: {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
    upcoming: {
        type: Boolean,
        default: false,
    },
});


const meals = model("meals", mealSchema);
module.exports = meals;
