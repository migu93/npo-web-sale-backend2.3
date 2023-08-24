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


exports.listImages = (req, res) => {
    const uploadsDirectory = path.join(__dirname, '/uploads');
    console.log(uploadsDirectory);

    fs.readdir(uploadsDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve images.' });
        }
        if (!fs.existsSync(uploadsDirectory)) {
            return res.status(500).json({ error: `Directory does not exist: ${uploadsDirectory}` });
        }

        if (!fs.existsSync(uploadsDirectory)) {
            return res.status(500).json({ error: `Directory does not exist: ${uploadsDirectory}` });
        }
        res.json(files);
    });


};
