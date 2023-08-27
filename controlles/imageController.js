const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');

exports.saveImage = (req, res) => {
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
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
