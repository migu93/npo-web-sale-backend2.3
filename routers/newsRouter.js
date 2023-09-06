const express = require('express');
const router = express.Router();
const newsController = require('../controlles/newsController');

// GET /news - Получить все новости
router.get('/', newsController.getAllNews);

// GET /news/:id - Получить новость по ID
router.get('/:id', newsController.getNewsById);

// POST /news - Создать новость
router.post('/', newsController.createNews);

// PUT /news/:id - Обновить новость по ID
router.put('/:id', newsController.updateNews);

// DELETE /news/:id - Удалить новость по ID
router.delete('/:id', newsController.deleteNews);

module.exports = router;