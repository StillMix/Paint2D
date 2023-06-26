const express = require('express');
const path = require('path');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

// Подключение модулей

const uploadModule = require('./modules/upload.js');
const saveModule = require('./modules/save.js');
const uploadMusicModule = require('./modules/uploadMusic.js');

// Middleware
app.use(express.static(path.join(__dirname, '')));
app.use(express.static(__dirname));
app.use(express.json());

// Роуты
app.use('/upload', uploadModule);
app.use('/uploadMusic', uploadMusicModule);
app.use('/save', saveModule);

app.listen(PORT, () => {
    console.log(__dirname);
    console.log('Ссылка на сервер');
    console.log(BASE_PATH);
});
