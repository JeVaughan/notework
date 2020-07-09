import * as electron from 'electron';
import express from 'express';
import IconPath from './images/edit-icon_1920.png';


// ---------------------- //
// --- Express Server --- //
// ---------------------- //

const SERVER_PORT: number = 3000;

const expressApp = express();

// expressApp.use('/', restfulFs(process.cwd() + "\\local\\"));

// expressApp.listen(SERVER_PORT, () => {
//   console.log(`Express server running on port ${SERVER_PORT}.`);
// });


// ----------------------- //
// --- Electron Window --- //
// ----------------------- //

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  electron.app.quit();
}

const APP_ICON: electron.NativeImage = 
  electron.nativeImage.createFromPath(IconPath)
    .resize({ width: 32, height: 32 });

function createWindow() {
  const window = new electron.BrowserWindow({
    height: 600, width: 800, 
    show: false, icon: APP_ICON
  });

  // window.setMenu(null);

  window.once('ready-to-show', () => {
    window.show();
    window.webContents.openDevTools({ mode: "detach" });
  })

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron.app.on('ready', createWindow);

// Quit when all windows are closed.
electron.app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});

electron.app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
