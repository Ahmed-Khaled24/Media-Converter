const { app, Menu, ipcMain, dialog } = require('electron');
const windowFactory = require('./browserWindowFactory');
const convert = require('./convert');
let mainWindow, loadingWindow;

app.on('ready', () => {
	mainWindow = windowFactory('main');
	mainWindow.on('closed', () => {
		app.quit();
	})
	loadingWindow = windowFactory('loading');
	Menu.setApplicationMenu(Menu.buildFromTemplate([]));
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
			dialog.showErrorBox('Insufficient input', 'No source file selected');
			return;
		} else if (!saveDirectory){
			dialog.showErrorBox('Insufficient input', 'No save directory selected');
			return;
		} else if (!toExtension) {
			dialog.showErrorBox('Insufficient input', 'No target extension selected');
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
					dialog.showMessageBoxSync(mainWindow, {
						title: 'Conversion finish',
						message: `${i+1} File converted successfully.`,
						type: 'info'
					});
				}
			} catch (err) {
				loadingWindow.hide();
				dialog.showErrorBox('error', err.message);
				break;
			}
		}
	}
);
