const electron = require('electron');
const dataRequester = require('./data_fetcher.js');
const url = require('url');
const path = require('path');
const { Menu } = require('electron');
const { app, BrowserWindow } = electron;
const globalShortcut = electron.globalShortcut;

// window ref
let win;


async function createWindow () {
      win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
    globalShortcut.register('f5', () => {
        console.log("F5 was pressed");
        win.reload();
    });
    await win.loadFile('index.html');
    //build menu from template

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    //win.webContents.openDevTools()
  }

// create a menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                accelerator: process.platform == 'darwin' ? 'Command + Q' : 'Ctrl + Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(createWindow);




app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})



// const vals = dataRequester.getData();
// vals.then((values) => {
//     console.log(values);
// });