const {ipcRenderer} = require('electron');

const progressBar = document.querySelector('.progress-value');
const percentage = document.querySelector('.value');
const title = document.querySelector('.fileName')


ipcRenderer.on('start', (event, fileName) => {
    title.innerHTML = fileName;
});

ipcRenderer.on('progress', (event, percent) => {
    percentage.innerHTML = percent;
    progressBar.style.width = `${percent}%`
});