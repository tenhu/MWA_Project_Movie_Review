const express = require('express');
const router = express.Router();


const ctrl = require('../controller/movie-manager');

router.get('/', ctrl.list);

module.exports = router;