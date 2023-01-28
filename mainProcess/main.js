const { app, Menu, ipcMain, dialog } = require('electron');
const windowFactory = require('./browserWindowFactory');
let mainWindow, loadingWindow;

app.on('ready', () => {
	mainWindow = windowFactory('main');
});

ipcMain.on('selectSources', (event, type, extension) => {
	const sources = dialog.showOpenDialogSync({
        properties: ['multiSelections'],
		filters: [
			{
				name: type,
				extensions: [extension],
			},
		],
	});
	if (sources) {
		event.sender.send('selectSourcesRes', sources);
	}
});

ipcMain.on('selectSave', (event) => {
	const saveFolder = dialog.showOpenDialogSync({
		properties: ['openDirectory'],
	});
	if (saveFolder) {
		event.sender.send('selectSaveRes', saveFolder);
	}
});
