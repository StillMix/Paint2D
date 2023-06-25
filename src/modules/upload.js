const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/human/img");
    },
    filename: (req, file, cb) => {
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueFileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

router.use(
    multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata")
);

router.post("/", function (req, res, next) {
    let filedata = req.file;
    console.log(filedata);
    if (!filedata) {
        res.send("Ошибка при загрузке файла");
    } else {
        res.send("Файл загружен");
        fs.readdir('./src/human/img', (err, data) => {
            const file = JSON.stringify(data);
            fs.writeFile('./src/human/human.json', file, (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
        });
    }
});

module.exports = router;
