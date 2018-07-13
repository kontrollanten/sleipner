import os from 'os';
import path from 'path';
import { app, shell, Menu, dialog } from 'electron';

const appName = app.getName();
const packageJson = require('../../package.json');

const fileAnIssueTemplate = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->

-

${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}
`;

const MenuTpl = [
  {
    label: 'File',
    submenu: [
      ...(process.platform === 'darwin' ? [{ role: 'about' }] : []),
      { role: 'quit',
        accelerator: 'CommandOrControl+Q'
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
    ],
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: `${appName} Website`,
        click: () => shell.openExternal(packageJson.homepage),
      },
      {
        label: `${appName} Source Code`,
        click: () => shell.openExternal(packageJson.repository.url),
      },
      {
        label: 'Report an issue',
        click: () => shell.openExternal(`${packageJson.repository.url}/issues/new?body=${encodeURIComponent(fileAnIssueTemplate)}`)
      },
      ...(process.platform === 'darwin' ? [] : [
        { type: 'separator' },
        {
          label: `About ${appName}`,
          click() {
            dialog.showMessageBox({
              title: `About ${appName}`,
              message: `${appName} ${app.getVersion()}`,
              detail: 'TBD',
              icon: path.join(__dirname, 'images', process.platform === 'linux' ? 'Icon-linux-about.png' : 'IconTray.png'),
              buttons: ['Close']
            });
          },
        },
      ]),
    ],
  }
];

export default Menu.buildFromTemplate(MenuTpl);
