const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './uploads/resources';  // Обновленный путь
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 }
]);

exports.advancedUploadImage = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        next();
    });
};

exports.saveAdvancedImage = (req, res) => {
    const resourceId = req.body.id || req.params.id;
    let response = {};

    if (req.files) {
        if (req.files.image) {
            response.imageUrl = `/uploads/resources/${resourceId}/${req.files.image[0].filename}`;
        }
        if (req.files.additionalImages) {
            response.additionalImageUrls = req.files.additionalImages.map(file => `/uploads/resources/${resourceId}/${file.filename}`);
        }
    }

    if (Object.keys(response).length === 0) {
        res.json({ message: 'No images uploaded' });
    } else {
        res.json(response);
    }
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
