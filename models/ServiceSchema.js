const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    icon: String,
    title: String,
    price: Number,
    images: [String],
    content: {
        type: Object, // Изменено с String на Object
        required: true
    }
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
