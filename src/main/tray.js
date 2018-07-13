import { app, Menu, Tray, ipcMain } from 'electron';
import { ICONS } from './icons';

let tray = null;

export default {
  create: win => {
    const toggleWin = () => {
      if (win.isVisible()) {
        win.hide();
      } else {
        win.show();
      }
    };

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show Sleipner',
        click() {
          toggleWin();
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]);

    tray = new Tray(ICONS.TRAY);
    tray.setContextMenu(contextMenu);
    tray.on('click', toggleWin);
  },
};
