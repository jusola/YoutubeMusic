// In the main process.
const { app, BrowserWindow, session, globalShortcut } = require('electron');
const { ElectronBlocker, fullLists, Request } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch'); // required 'fetch'

async function createWindow(){
  var win = new BrowserWindow({ width: 1280, height: 720, show:false})
  win.setMenuBarVisibility(false),
  win.on('closed', () => {
    win = null
  })
  setInterval(()=>{
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: '+'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: '+'});
    setTimeout(()=>{
      win.webContents.sendInputEvent({type: 'keyDown', keyCode: '+'});
      win.webContents.sendInputEvent({type: 'keyUp', keyCode: '+'});
    }, 1)

  }, 1200000);
  win.once('ready-to-show', () => {
    win.show()
  })
  globalShortcut.register('Shift+CommandOrControl+K', () => {
    console.log('Play/Pause');
    let wasMinimized = win.isMinimized();
    //win.focus();
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'Space'});
    if(wasMinimized){
      win.minimize();
    }
  })
  globalShortcut.register('CommandOrControl+Shift+J', () => {
    console.log("Prev");
    let wasMinimized = win.isMinimized();
    //win.focus();
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'K'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'K'});
    if(wasMinimized){
      win.minimize();
    }
  })
  globalShortcut.register('Shift+CommandOrControl+T', () => {
    console.log("Tets");
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'Space'});
  })
  globalShortcut.register('Shift+CommandOrControl+L', () => {
    console.log("Next");
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'J'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'J'});
  })
  globalShortcut.register('Shift+CommandOrControl+O', () => {
    console.log("Like");
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: '+'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: '+'});
  })
  globalShortcut.register('Shift+CommandOrControl+M', () => {
    console.log("Dislike");
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: '-'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: '-'});
  })
  const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  });
  blocker.enableBlockingInSession(session.defaultSession);
  // Load a remote URL
  win.loadURL('https://music.youtube.com');

}

app.on('ready', createWindow);
