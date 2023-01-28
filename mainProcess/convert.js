const ffmpeg = require('fluent-ffmpeg');
const {parse, join} = require('path');

module.exports = function converter(sources, saveFolderPath, targetExtension, window){
    sources.forEach((source) => {
        const {dir, name} = parse(source);
        const pathWithoutExtension = join(dir, name);

        ffmpeg()
            .input(source)
            .output(`${pathWithoutExtension}.${targetExtension}`)
            .on('progress', ({percent}) => {})
            .on('error', (err) => {
                console.log(err.message);
            })
            .on('end', () => {
                console.log('done');
            })
            .run();
    });   
}