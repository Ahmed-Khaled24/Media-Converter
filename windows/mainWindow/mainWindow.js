const videoFormats = ['MP4', 'MKV', 'MOV', 'AVI','WMV'];
const audioFormats = ['WAV', 'AIFF', 'MP3', 'AAC', 'OGG', 'WMA', 'FLAC', 'ALAC'];
const imageFormats = [ 'JPEG', 'JPG', 'PNG', 'GIF','WebP' ,'TIFF', 'BMP', 'HEIF', 'SVG' ];

const mediaType = document.querySelector('select[name="mediaType"]');
const sourceExtension = document.querySelector('select[name="sourceExtension"]');
const targetExtension = document.querySelector('select[name="targetExtension"]');


mediaType.addEventListener('change', (event) => {
    console.log('media type changed');
    sourceExtension.innerHTML = '';
    targetExtension.innerHTML = '';
    let formats;
    switch(mediaType.value){
        case 'video':
            formats = videoFormats;
            break;
        case 'image': 
            formats = imageFormats;
            break;
        case 'audio':
            formats = audioFormats;
            break;
        default: 
            console.log('Unsupported type');
    }
    formats = formats.map( (format) => {
        return `<option name='${format}'> ${format} </option>`
    });
    sourceExtension.innerHTML = formats.join('\n');
    targetExtension.innerHTML = formats.join('\n');
});