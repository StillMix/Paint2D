const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/human/music");
  },
  filename: (req, file, cb) => {
     const files = fs.readdirSync("./src/human/music"); // Читаем список файлов в директории
    const fileNumber = files.length + 1; // Нумерация нового файла
    const uniqueFileName = `${fileNumber}.${Buffer.from(file.originalname, 'latin1').toString('utf8')}`;
    cb(null, uniqueFileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/mp3"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.use(
  multer({ storage: storageConfig, fileFilter: fileFilter }).array("musicdata")
);

router.post("/", function (req, res, next) {
  let files = req.files;
  console.log(files);
  if (!files) {
    res.send("Ошибка при загрузке файлов");
  } else {
    res.send("Файлы загружены");
    fs.readdir('./src/human/music', (err, data) => {
      const file = JSON.stringify(data);
      fs.writeFile('./src/human/music.json', file, (err) => {
        if (err) throw err;
        console.log('Data written to file');
        fetchs()
      });
    });
  }
});

module.exports = router;
