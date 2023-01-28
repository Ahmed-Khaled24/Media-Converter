const {ipcRenderer} = require('electron');

const allFormats = {
    video: ['MP4', 'MKV', 'MOV', 'AVI','WMV'],
    audio: ['WAV', 'AIFF', 'MP3', 'AAC', 'OGG', 'WMA', 'FLAC', 'ALAC'],
    image: [ 'JPEG', 'JPG', 'PNG', 'GIF','WebP' ,'TIFF', 'BMP', 'HEIF', 'SVG']
};

const mediaType = document.querySelector('select[name="mediaType"]');
const sourceExtension = document.querySelector('select[name="sourceExtension"]');
const targetExtension = document.querySelector('select[name="targetExtension"]');
const sourceBtn = document.querySelector('button.row3');
const saveBtn = document.querySelector('button.row4');
const sourceInput = document.querySelector('input.row3');
const saveInput = document.querySelector('input.row4');
const convertBtn = document.querySelector('button.main-btn');

const conversionDetails = {
    sources: '',
    saveDirectory: '',
    toExtension: '',
}

mediaType.addEventListener('change', (event) => {
    sourceExtension.innerHTML = '';
    targetExtension.innerHTML = '';
    let formats;
    switch(mediaType.value){
        case 'video':
            formats = allFormats.video;
            break;
        case 'image': 
            formats = allFormats.image;
            break;
        case 'audio':
            formats = allFormats.audio;
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

targetExtension.addEventListener('change', (event) => {
    conversionDetails.toExtension = targetExtension.value;
});

sourceBtn.addEventListener('click', () => {
    ipcRenderer.send('selectSources', mediaType.value, sourceExtension.value);
    ipcRenderer.on('selectSourcesRes', (event, sources) => {
        conversionDetails.sources = sources;
        sourceInput.value = sources;
    })
});

saveBtn.addEventListener('click', () => {
    ipcRenderer.send('selectSave');
    ipcRenderer.on('selectSaveRes', (event, saveDirectory) => {
        conversionDetails.saveDirectory = saveDirectory;
        saveInput.value = saveDirectory;
    })
})

convertBtn.addEventListener('click', () => {
    ipcRenderer.send('startConversion', conversionDetails);
});

ipcRenderer.on('finishConversion', () => {
    window.location.reload();
})