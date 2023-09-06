const News = require('../models/newsSchema');

// Получить все новости
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Получить новость по ID
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Создать новость
exports.createNews = async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Обновить новость по ID
exports.updateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!news) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Удалить новость по ID
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }
        res.json({ message: 'Новость успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};