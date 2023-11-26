const express = require('express');
const createToken = require('../../apis/createToken/createToken');
const router = express.Router();

// const mealCollection = mongoose.model('meal', mongoose.Schema({}), 'meals')
router.post('/jwt', createToken)


module.exports = router;