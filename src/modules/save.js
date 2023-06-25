const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.post("/", (req, res) => {
    const imageData = req.body.image;
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const filename = path.join(__dirname, "../human/drawImg", `${uuidv4()}.jpg`);

    fs.writeFile(filename, base64Data, "base64", (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            fs.readdir('./src/human/drawImg', (err, data) => {
                const file = JSON.stringify(data);
                fs.writeFile('./src/human/drawImg.json', file, (err) => {
                    if (err) throw err;
                    console.log("Image saved successfully!");
                });
            });
            res.sendStatus(200);
        }
    });
});

module.exports = router;
