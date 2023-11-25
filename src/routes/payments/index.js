const express = require('express');
const router = express.Router();
const { default: payments } = require('../../apis/payments/payments');

// const mealCollection = mongoose.model('meal', mongoose.Schema({}), 'meals')
router.post('/create-payment-intent', payments)


module.exports = router;