
const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');

require('./server.js')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1300,
        height: 800,
        minWidth: 1300,
        minHeight: 800,
        title: "Paint2D",
        icon: __dirname + "./img/facion.jpg",
        autoHideMenuBar: true,

    });
   
    win.loadURL(`http://localhost:3000/`);

    win.on('closed', () => {
        win = null;

    });
}

app.on('ready', createWindow);
//
app.on('window-all-closed', () => {
    app.quit();
})