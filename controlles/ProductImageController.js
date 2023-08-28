const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './uploads/categories'; // Здесь указан путь к подпапке
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

exports.advancedUploadImage = upload.single('image');

exports.saveAdvancedImage = (req, res) => {
    const resourceId = req.body.id || req.params.id;
    res.json({ imageUrl: `/uploads/resources/${resourceId}/${req.file.filename}` });
};

exports.getAllImagesFromResource = (req, res) => {
    const resourceId = req.params.id;
    const folderPath = path.join(__dirname, '..', 'uploads', 'resources', resourceId);

    if (!fs.existsSync(folderPath)) {
        return res.status(404).json({ message: "Folder not found" });
    }

    const files = fs.readdirSync(folderPath);

    const images = files.map(filename => ({
        filename,
        url: `/uploads/resources/${resourceId}/${filename}`
    }));

    res.json(images);
};