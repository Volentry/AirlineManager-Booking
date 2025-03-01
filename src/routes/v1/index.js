const express = require('express');
const router = express.Router();
const {infoController} = require('../../controllers')
router.get('/info', infoController.info);

const bookingroutes = require('./bookingroutes')
router.use('/bookings', bookingroutes);

module.exports = router; 
