import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import electron from 'electron';

describe('main/index', () => {
  let oldEnvVars;
  const sandbox = sinon.createSandbox();
  const mockDependencies = {
    'electron-context-menu': sinon.spy(),
    'electron-debug': sinon.spy(),
  };

  before(() => {
    oldEnvVars = process.env;
  });

  afterEach(() => {
    sandbox.restore();
    process.env = oldEnvVars;
  });

  it('should run electronDebug if NAME is `development`', () => {
    process.env.NAME = 'development';
    const electronDebug = sinon.spy();
    proxyquire('./', {
      ...mockDependencies,
      'electron-debug': electronDebug
    });

    expect(electronDebug).to.have.been.calledWith({ enabled: true });
  });

  it('should run electronContextMenu if NAME is `development`', () => {
    process.env.NAME = 'development';
    const electronContextMenu = sinon.spy();
    proxyquire('./', {
      ...mockDependencies,
      'electron-context-menu': electronContextMenu
    });

    expect(electronContextMenu).to.have.been.calledWith();
  });

  it('should exit when a second instance of the app is created', () => {
    sandbox.stub(electron.app, 'makeSingleInstance').returns(true);
    sandbox.spy(electron.app, 'exit');
    proxyquire('./', mockDependencies);

    expect(electron.app.exit).to.have.been.calledWith();
  });

  describe('app ready', () => {
    const getReadyCb = () =>
      electron.app.on.getCalls()
        .filter(call => call.args[0] === 'ready')
        .pop().args[1];

    beforeEach(() => {
      sandbox.spy(electron.app, 'on');
    });

    it('should initiate the application menu', () => {
      sandbox.stub(electron.globalShortcut, 'register');
      sandbox.stub(electron.Menu, 'setApplicationMenu');
      const mockMenu = electron.Menu.buildFromTemplate([{
        label: 'Window',
        role: 'window',
        submenu: [
          { role: 'minimize' },
        ],
      }]);
      proxyquire('./', {
        ...mockDependencies,
        './menu': mockMenu,
        './tray': sinon.spy(),
      });

      getReadyCb()();

      expect(electron.Menu.setApplicationMenu).to.have.been.calledWith();
    });
  });
});
