const express = require('express');
const router = express.Router();
const imageController = require('controlles/imageController');

router.post('/upload', imageController.uploadImage, imageController.saveImage);
router.use('/uploads', express.static('uploads'));

module.exports = router;
