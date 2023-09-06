const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    paragraphs: [{
        type: String
    }],
    mainImage: {
        type: String
    },
    postImages: [{
        type: String
    }],
    logo: {
        type: String
    },
    technicalSpecifications: {
        type: Map,
        of: String
    },
    availability: {
        type: Boolean
    },
    lastEditedPrice: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;