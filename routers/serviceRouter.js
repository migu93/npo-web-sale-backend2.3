const express = require('express');
const router = express.Router();
const serviceController = require('../controlles/serviceController');

router.get('/get-all', serviceController.getAllServices);
router.get('/get/:id', serviceController.getServiceById);
router.post('/create', serviceController.createService);
router.put('/update/:id', serviceController.updateService);
router.delete('/delete/:id', serviceController.deleteService);

module.exports = router;
