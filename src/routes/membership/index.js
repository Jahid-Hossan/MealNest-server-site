const express = require('express');
const memberships = require('../../apis/membership/membership');
const router = express.Router();

router.get('/memberships', memberships)


module.exports = router;