const {app, Menu, shell} = require('electron');
const windowFactory = require('./browserWindowFactory');
let mainWindow, loadingWindow;

app.on('ready', () => {
    mainWindow = windowFactory('main');
});