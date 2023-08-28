const Product = require('../models/productSchema');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        const products = await Product.find({ category: categoryId }).populate('category');

        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
