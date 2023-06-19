
const express = require('express');
const path = require('path');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const fs = require('file-system');
const multer = require('multer');

app.use(express.static(path.join(__dirname, '')));


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./src/human/img");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }
 
app.use(express.static(__dirname));
 
app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
    res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
        fs.readdir('./src/human/img', (err,data) => {
            const file = JSON.stringify(data);
            fs.writeFile('./src/human/human.json', file, (err) => { 
                if (err) throw err; 
                console.log('Data written to file'); 
                }); 
        })
});

app.listen(PORT, () => {
    console.log(__dirname)
    console.log('Ссылка на сервер');
    console.log(BASE_PATH);
});

