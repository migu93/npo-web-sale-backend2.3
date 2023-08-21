const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const imageController = require('../controlles/imageController');
const router = express.Router();

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/image/:id', imageController.getImage);

module.exports = router;
