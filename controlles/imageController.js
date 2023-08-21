const Image = require('../models/imageSchema');

exports.uploadImage = (req, res) => {
    const image = new Image({
        name: req.file.originalname,
        image: req.file.buffer,
        contentType: req.file.mimetype,
    });

    image.save()
        .then(() => res.json({ message: 'Image uploaded successfully!' }))
        .catch(err => res.status(400).json({ error: err }));
};

exports.getImage = (req, res) => {
    Image.findById(req.params.id)
        .then(image => {
            res.set('Content-Type', image.contentType);
            res.send(image.image);
        })
        .catch(err => res.status(400).json({ error: err }));
};
