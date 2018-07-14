import path from 'path';
import { app, BrowserWindow, ipcMain, globalShortcut, Menu } from 'electron';
import electronDebug from 'electron-debug';
import tray from './tray';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import menu from './menu';

const isDev = process.env.NAME === 'development';

if (isDev) {
  electronDebug({enabled: true});

  require('electron-context-menu')();
}

let mainWindow;
const isAlreadyRunning = app.makeSingleInstance(() => true);

if (isAlreadyRunning) {
  app.exit();
}

function createMainWindow() {
  const win = new BrowserWindow({
    title: app.getName(),
    show: false,
    width: isDev ? 1000 : 500,
    height: isDev ? 800 : 150,
    frame: false,
    icon: process.platform === 'linux' && path.join(__dirname, 'images/Icon.png'),
    alwaysOnTop: !isDev,
    webPreferences: {
      preload:  './renderer.js',
      nodeIntegration: true,
      plugins: true
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:8080');
  } else {
    win.loadURL('file://'.concat(__dirname, '/index.html'));
  }

  return win;
}

app.on('ready', () => {
  if (isDev) {
    /* eslint-disable no-console */
    [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]
      .forEach(extension =>
        installExtension(extension)
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log('An error occurred: ', err))
      );
    /* eslint-enable no-console */
  }

  Menu.setApplicationMenu(menu);
  tray.create(mainWindow);

  const openCmd = globalShortcut.register('CommandOrControl+X', () => {
    if (!mainWindow) {
      mainWindow = createMainWindow();
    }
    mainWindow.show();
    console.log('CommandOrControl+X is pressed')
  });

  if (!openCmd) {
    console.log('registration failed')
  }

  ipcMain.on('resize', (e, height) => {
    mainWindow.setSize(1000, height);
  });

  mainWindow = createMainWindow();
  mainWindow.show();
});

ipcMain.on('hide-window', () => mainWindow.hide());
