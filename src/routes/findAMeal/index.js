const express = require('express');
const findAMeal = require('../../apis/Meals/findAMeal');
const router = express.Router();

// const mealCollection = mongoose.model('meal', mongoose.Schema({}), 'meals')
router.get('/meals/:id', findAMeal)


module.exports = router;