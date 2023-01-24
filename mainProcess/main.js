const {app, BrowserWindow, Menu, shell} = require('electron');
const {join} = require('path');
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 350,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: false,
        show: false,
    });
    mainWindow.on('ready-to-show', ()=> {
        mainWindow.show();
    })
    mainWindow.loadFile(join(__dirname, '../windows/mainWindow/mainWindow.html'));
   
    mainWindow.webContents.on('will-navigate', (event, url) => {
        console.log(url);
        console.log('new window event');
        event.preventDefault();
        shell.openExternal(url);
    })

    // Menu.setApplicationMenu(Menu.buildFromTemplate([]));
});


