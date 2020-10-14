const express = require('express');
const { requireSignin } = require('../common-middleware');
const { dashboard } = require('../controller/dashboard');
const router = express.Router();
const {signup, signin} = require('../controller/auth')
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');

router.get('/dashboard/:user', requireSignin, dashboard)

// router.post('/profile', reqiredSignin, (req, res) =>{
//     res.status(200).json({message:"proflie"})
// })

module.exports = router;