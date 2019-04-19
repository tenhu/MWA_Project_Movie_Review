const express = require('express');
const router = express.Router();

const review = require('../controller/review');

router.get('/', review.showReview);


module.exports = router;