const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addPoint } = require('../controller/points');
const router = express.Router();


router.post('/user/points', requireSignin, adminMiddleware, addPoint)

module.exports = router;