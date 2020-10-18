const express = require('express');
const { signin, signup } = require('../../controller/admin/admin.controller');
const router = express.Router();

router.post('/signin', signin);

router.post('/signup', signup);

// router.post('/profile',requiresignin, (req, res)=>{
//     res.status(200).json({user: 'profile'})
// });

module.exports = router;