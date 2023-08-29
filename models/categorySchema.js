const mongoose = require('mongoose');
const {model} = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    categoryUrl: String
});

module.exports = model('Category', categorySchema);