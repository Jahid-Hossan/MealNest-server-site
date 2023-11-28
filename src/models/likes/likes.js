const mongoose = require('mongoose');

const likerSchema = new mongoose.Schema({
    email: String,
    mealId: String,
});

const LikerUser = mongoose.model('likes', likerSchema);

module.exports = LikerUser;
