const ffmpeg = require('fluent-ffmpeg');
const { parse, join } = require('path');

module.exports = function converter(source, saveFolderPath, targetExtension, loadingWindow) {
	const {name, ext} = parse(source);   
	return new Promise((resolve, reject) => {
		ffmpeg()
			.input(source)
			.output( join(saveFolderPath[0], `${name}.${targetExtension}`) )
            .on('start', () => {
                loadingWindow.webContents.send('start', `${name}${ext}`)
            })
			.on('progress', ({ percent }) => {
				loadingWindow.webContents.send('progress', Math.trunc(percent));
			})
			.on('error', (err) => {
				throw new Error(err.message);
			})
			.on('end', () => {
				resolve('done');
			})
			.run();
	});
};
