const express = require('express');
const meals = require('../../models/findAllMeals/meals');
const findAllMeals = require('../../Meals/findAllMeals');
const router = express.Router();

// const mealCollection = mongoose.model('meal', mongoose.Schema({}), 'meals')
router.get('/meals', findAllMeals)


module.exports = router;