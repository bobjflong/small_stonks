"use strict";
// Modules to control application life and create native browser window
var _a = require('electron'), app = _a.app, Menu = _a.Menu, Tray = _a.Tray, BrowserWindow = _a.BrowserWindow;
var path = require('path');
function createWindow() {
    // Create the browser window.
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js')
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile('../index.html');
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}
var tray;
var assetsDirectory = path.join(__dirname, '../assets');
var createTray = function () {
    tray = new Tray(path.join(assetsDirectory, 'sunTemplate.png'));
    tray.on('click', function () {
        console.warn("hello");
    });
    tray.setTitle("MSFT");
    setInterval(function () {
        // tray.setTitle(Math.random().toString())
    });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(function () {
    createWindow();
    createTray();
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
        app.quit();
});
app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
