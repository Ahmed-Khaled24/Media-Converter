const {ipcRenderer, shell} = require('electron');

const allFormats = {
    video: ['mp4', 'mkv', 'mov', 'avi','wmv'],
    audio: ['wav', 'aiff', 'mp3', 'aac', 'ogg', 'wma', 'flac'],
    image: [ 'jpeg', 'jpg', 'png', 'gif','webp' ,'tiff', 'bmp']
};

const mediaType = document.querySelector('select[name="mediaType"]');
const sourceExtension = document.querySelector('select[name="sourceExtension"]');
const targetExtension = document.querySelector('select[name="targetExtension"]');
const sourceBtn = document.querySelector('button.row3');
const saveBtn = document.querySelector('button.row4');
const sourceInput = document.querySelector('input.row3');
const saveInput = document.querySelector('input.row4');
const convertBtn = document.querySelector('button.main-btn');
const myLinkedIn = document.querySelector('a')

myLinkedIn.addEventListener('click', (event) => {
    event.preventDefault();
    shell.openExternal(myLinkedIn.href);
})

mediaType.addEventListener('change', (event) => {
    fillSelectors(mediaType.value);
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


function fillSelectors(type) {
    sourceExtension.innerHTML = '';
    targetExtension.innerHTML = '';
    let formats;
    switch(type){
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
}
fillSelectors('image');

const conversionDetails = {
    sources: '',
    saveDirectory: '',
    toExtension: targetExtension.value,
}