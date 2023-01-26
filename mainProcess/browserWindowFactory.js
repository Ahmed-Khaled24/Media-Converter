const {BrowserWindow} = require('electron');
const {join} = require('path');

const MAIN_WINDOW_WIDTH = 600;
const MAIN_WINDOW_HEIGHT = 350;
const LOADING_WINDOW_WIDTH = 400;
const LOADING_WINDOW_HEIGHT = 250;


module.exports = function windowFactory (windowType) { /* Types such as: main, loading, alert */
    let browserWindow = new BrowserWindow({
        backgroundColor: '#343A40',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: false,
        show: false,
    });

    if(windowType === 'main'){
        browserWindow.setSize(MAIN_WINDOW_WIDTH, MAIN_WINDOW_HEIGHT);
        browserWindow.loadFile(join(__dirname, '../windows/mainWindow/mainWindow.html'));
    } else if(windowType === 'loading'){
        browserWindow.setAlwaysOnTop(true);
        browserWindow.setSize(LOADING_WINDOW_WIDTH, LOADING_WINDOW_HEIGHT);
        browserWindow.loadFile(join(__dirname, '../windows/loading window/loadingWindow.html'));
    }

    browserWindow.on('ready-to-show', () => {
        browserWindow.center();
        browserWindow.show();
    });

    return browserWindow;
}