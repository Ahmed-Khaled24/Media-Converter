const {BrowserWindow} = require('electron');
const {join} = require('path');

const DIMENSIONS = {
    main: {
        height: 350,
        width: 600,
    },
    loading: {
        height: 250,
        width: 400,
    }
}


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
        browserWindow.setSize(DIMENSIONS.main.width, DIMENSIONS.main.height);
        browserWindow.loadFile(join(__dirname, '../windows/mainWindow/mainWindow.html'));
        browserWindow.on('ready-to-show', () => {
            browserWindow.show();
        });
    } else if(windowType === 'loading'){
        browserWindow.setAlwaysOnTop(true);
        browserWindow.setSize(DIMENSIONS.loading.width, DIMENSIONS.loading.height);
        browserWindow.loadFile(join(__dirname, '../windows/loading window/loadingWindow.html'));
    }

    browserWindow.center();
    return browserWindow;
}