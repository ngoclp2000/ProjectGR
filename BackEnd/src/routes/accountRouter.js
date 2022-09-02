const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

router.post('/signUp', accountController.signUp);
router.post('/completeProfile', accountController.completeProfile);
router.post("/signIn", accountController.signIn);

module.exports = router;