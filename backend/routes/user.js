const express = require('express');
const router = express.Router();

//IMPORT REGEXFILTER
const regexEmail = require("../middleware/regexfilter");


const userCtrl = require('../controllers/user');
const regexfilter = require('../middleware/regexfilter');

router.post('/signup', regexEmail, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; 