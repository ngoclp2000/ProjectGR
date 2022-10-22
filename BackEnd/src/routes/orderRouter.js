const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

router.use(checkAuth);

router.post('/takePayment',orderController.takePayment);

module.exports = router;