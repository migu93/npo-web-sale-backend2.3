const express = require('express');
const imageController = require("../controlles/ProductImageController");
const router = express.Router();

router.post('/uploadAdvanced', imageController.advancedUploadImage, imageController.saveAdvancedImage);
router.get('/images/resource/:id', imageController.getAllImagesFromResource);

module.exports = router;