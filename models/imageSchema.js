const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    image: Buffer, // Буфер для хранения двоичных данных изображения
    contentType: String, // MIME-тип изображения (например, "image/png")
});

module.exports = mongoose.model('Image', imageSchema);
