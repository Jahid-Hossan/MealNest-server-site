const express = require('express');
const router = express.Router();
const updateLike = require('../../apis/Meals/updateLike/updateLike')

// const mealCollection = mongoose.model('meal', mongoose.Schema({}), 'meals')
router.patch('/meals/:id', updateLike)


module.exports = router;