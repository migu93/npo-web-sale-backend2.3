const express = require('express');
const imageController = require("../controlles/imageController");
const router = express.Router();

router.post('/upload', imageController.uploadImage, imageController.saveImage);

router.use('/uploads', express.static('uploads'));

router.get('/get-all', imageController.getAllImages);
router.get('/get-all/:folderName', imageController.getAllImagesFromFolder);

router.post('/upload/categories', imageController.uploadImage, imageController.saveImage);

module.exports = router;
