const multer = require('multer');

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
