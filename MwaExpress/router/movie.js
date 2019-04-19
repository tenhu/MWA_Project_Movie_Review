
const express = require('express');
const router = express.Router();

const movie = require('../controller/movie');

router.get('/', movie.showMovie);

module.exports = router;