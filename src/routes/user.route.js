const express = require('express');
const { signup } = require('../controller/user.controller');
const router = express.Router();
const User = require('../models/user.model')

router.post('/signin',(req, res)=>{

})

router.post('/signup', signup)

module.exports = router;