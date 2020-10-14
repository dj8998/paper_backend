const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addPoint } = require('../controller/points');
const router = express.Router();


router.post('/user/points', requireSignin, userMiddleware, addPoint)

module.exports = router;