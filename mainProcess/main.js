const { app, Menu, ipcMain, dialog } = require('electron');
const windowFactory = require('./browserWindowFactory');
const convert = require('./convert');
let mainWindow, loadingWindow;

app.on('ready', () => {
	mainWindow = windowFactory('main');
	loadingWindow = windowFactory('loading');
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

ipcMain.on(
	'startConversion',
	async (event, { sources, saveDirectory, toExtension }) => {
		if(!sources){
			dialog.showErrorBox('error', 'No file selected');
			return;
		} else if (!saveDirectory){
			dialog.showErrorBox('error', 'No save directory selected');
			return;
		} else if (!toExtension) {
			dialog.showErrorBox('error', 'No target extension selected');
			return;
		}

		for (let i = 0; i < sources.length; i++) {
			loadingWindow.show();
			try {
				await convert(
					sources[i],
					saveDirectory,
					toExtension,
					loadingWindow
				);
				if (i === sources.length - 1) {
					loadingWindow.hide();
					mainWindow.webContents.send('finishConversion');
					dialog.showMessageBoxSync(mainWindow, {
						title: 'Conversion finish',
						message: `${i+1} File converted successfully.`,
						type: 'info'
					});
				}
			} catch (err) {
				dialog.showErrorBox('error', err.message);
				break;
			}
		}
	}
);
