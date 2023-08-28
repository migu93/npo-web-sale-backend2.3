const express = require('express');
const router = express.Router();
const productController = require('../controlles/productController');

router.get('/get-all', productController.getAllProducts);
router.get('/get/:id', productController.getProductById);
router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/del/:id', productController.deleteProduct);

module.exports = router;