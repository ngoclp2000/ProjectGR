const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/:productId', productController.getProductById);
router.post('/dataTable',productController.getDataTable);

module.exports = router;