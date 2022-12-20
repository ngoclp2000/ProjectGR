const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");

router.use(checkAuth);

router.post('/dataTable',productController.getDataTable);
router.post('/dataProductList',productController.getProductList);
router.get('/productManage', productController.getProductManage);

router.get('/:productId', productController.getProductById);
module.exports = router;