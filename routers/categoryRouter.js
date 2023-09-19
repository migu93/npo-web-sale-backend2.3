const express = require('express');
const router = express.Router();
const categoryController = require('../controlles/categoriesController');

router.post('/create', categoryController.createCategory);
router.get('/get-all', categoryController.getCategories);
router.get('/get/:id', categoryController.getCategory);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/del/:id', categoryController.deleteCategory);

module.exports = router;
