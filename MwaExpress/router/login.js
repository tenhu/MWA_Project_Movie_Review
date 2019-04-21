const express = require('express');
const router = express.Router();


const ctrl = require('../controller/login');

router.post('/', ctrl.login);

module.exports = router;