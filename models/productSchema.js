const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    detailedDescription: {
        type: String,
        required: true
    },
    application: [{
        type: String
    }],
    mainImage: {
        type: String,
        required: true
    },
    additionalImages: [{
        type: String
    }],
    documentsAndFiles: [{
        type: String
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = model('Product', productSchema);
