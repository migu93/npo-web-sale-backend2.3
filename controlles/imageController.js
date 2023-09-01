const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderName = req.params.folderName || 'default';
        const uploadPath = `./uploads/${folderName}`; // Здесь указан путь к подпапке
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');

exports.saveImage = (req, res) => {
    res.json({ imageUrl: `/uploads/categories/${req.file.filename}` });
};

exports.getAllImages = (req, res) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const files = fs.readdirSync(uploadsDir);

    const images = files.map(filename => ({
        filename,
        url: `/uploads/${filename}`
    }));

    res.json(images);
};

exports.getAllImagesFromFolder = (req, res) => {
    const folderName = req.params.folderName;
    const folderPath = path.join(__dirname, '..', 'uploads', folderName);

    if (!fs.existsSync(folderPath)) {
        return res.status(404).json({ message: "Folder not found" });
    }

    const files = fs.readdirSync(folderPath);

    const images = files.map(filename => ({
        filename,
        url: `/uploads/${folderName}/${filename}`
    }));

    res.json(images);
};
