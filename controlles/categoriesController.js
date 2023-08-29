const Category = require('../models/categorySchema');
const multer = require('multer');
const upload = multer({ dest: 'uploads' }); // здесь "uploads/" это путь, где будут сохраняться загруженные файлы

exports.createCategory = async (req, res) => {
    const { name, imageUrl, categoryUrl } = req.body;

    // Проверяем, что все необходимые поля заполнены
    if (!name || !imageUrl || !categoryUrl) {
        return res.status(400).json({ message: 'All fields (name, imageUrl, categoryUrl) are required' });
    }
    //upload

    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).json({ message: 'Category successfully created', category });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCategory = (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const categoryData = { ...req.body };
            if (req.file) {
                const filePath = req.file.path; // путь к файлу на сервере
                categoryData.imageUrl = filePath; // вы можете адаптировать этот путь в соответствии с тем, как вы хотите его хранить в базе данных
            }

            const category = await Category.findByIdAndUpdate(req.params.id, categoryData, { new: true });
            res.json(category);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });
};


exports.deleteCategory = async (req, res) => {
    console.log("Trying to delete category with ID:", req.params.id);
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category has been deleted' });
    } catch (err) {
        console.error("Error while deleting category:", err);
        res.status(500).json({ message: err.message });
    }
};
