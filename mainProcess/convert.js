const ffmpeg = require('fluent-ffmpeg');
const { parse, join } = require('path');

const ffmpegPath = require('ffmpeg-static').replace(
    'app.asar',
    'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
    'app.asar',
    'app.asar.unpacked'
);
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

module.exports = function converter(
	source,
	saveFolderPath,
	targetExtension,
	loadingWindow
) {
	const { name, ext } = parse(source);
	return new Promise((resolve, reject) => {
		ffmpeg()
			.input(source)
			.output(join(saveFolderPath[0], `${name}.${targetExtension}`))
			.on('start', () => {
				loadingWindow.webContents.send('start', `${name}${ext}`);
			})
			.on('progress', ({ percent }) => {
				if (percent > 1) {
					loadingWindow.webContents.send(
						'progress',
						Math.trunc(percent)
					);
				}
			})
			.on('error', (err) => {
				reject(err);
			})
			.on('end', () => {
				resolve('done');
			})
			.run();
	});
};
