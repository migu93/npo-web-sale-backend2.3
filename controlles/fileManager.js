const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const path = require('path');

// Переходим на уровень вверх от текущей директории и затем в папку uploads
const rootFolder = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.query.folder || "uploads"; // Изменено с req.body на req.query
        const folderPath = path.join(__dirname, '..', 'uploads', folder); // Добавлен корневой путь

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});



const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file) {
        res.status(200).json({ message: "File uploaded" });
    } else {
        res.status(400).json({ message: "No file provided" });
    }
});


// Get Files in Folder
router.get("/files", (req, res) => {
    const folder = req.query.folder || "uploads";
    const folderPath = path.join(rootFolder, folder);  // Используем переменную rootFolder

    if (!fs.existsSync(folderPath)) {
        return res.status(404).json({ message: "Folder not found" });
    }

    const files = fs.readdirSync(folderPath);

    res.json(files.map((file) => ({ name: file })));
});



// Delete File
router.delete("/files/:name", (req, res) => {
    const folder = req.query.folder || "uploads";
    const filePath = path.join(__dirname, folder, req.params.name);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.status(200).json({ message: "File deleted" });
    } else {
        res.status(404).json({ message: "File not found" });
    }
});

router.get('/folders', (req, res) => {
    const rootFolder = path.join(__dirname, '..', 'uploads'); // ваш корневой каталог
    if (fs.existsSync(rootFolder)) {
        const folders = fs.readdirSync(rootFolder, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        res.json(folders);
    } else {
        res.status(404).send('Папка не найдена');
    }
});




module.exports = router;
