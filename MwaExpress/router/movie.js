
const express = require('express');
const router = express.Router();

const movie = require('../controller/movie');

router.get('/', movie.showMovie);
router.post('/', movie.addMovie);
router.get('/:id', movie.showOneMovie);

module.exports = router;