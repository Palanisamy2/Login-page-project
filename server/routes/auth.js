const express = require('express');
const { login, signupUser, changePassword } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signupUser);
router.post('/change-password', changePassword);

module.exports = router;
