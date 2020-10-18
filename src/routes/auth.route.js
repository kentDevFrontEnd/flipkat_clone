const express = require('express');
const { signup, signin, requiresignin } = require('../controller/auth.controller');
const router = express.Router();

router.post('/signin', signin)

router.post('/signup', signup)

router.post('/profile',requiresignin, (req, res)=>{
    res.status(200).json({user: 'profile'})
})

module.exports = router;