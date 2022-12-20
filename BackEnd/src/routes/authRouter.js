const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/refresh-token', authController.refreshToken);
router.post('/remove-token', authController.removeToken);
module.exports = router;