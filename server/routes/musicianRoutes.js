const express = require('express');
const { signupMusician, loginMusician } = require('../controllers/musicianControllers');

const router = express.Router();

router.post('/signup', signupMusician);
router.post('/login', loginMusician);

module.exports = router;
