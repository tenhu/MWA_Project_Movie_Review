
const express = require('express');
const router = express.Router();

const movie = require('../controller/movie');

router.get('/', movie.showMovie);
router.get('/add', movie.addMovie);

module.exports = router;