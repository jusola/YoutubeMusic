// In the main process.
const { app, BrowserWindow, session, globalShortcut } = require('electron');
const { ElectronBlocker, fullLists, Request } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch'); // required 'fetch'

var currentInterval = null;

async function createWindow(){
  var win = new BrowserWindow({ width: 1280, height: 720, show:false})
  win.setMenuBarVisibility(false),
  win.on('closed', () => {
    win = null
  })
  currentInterval = setInterval(()=>{
    toggleMute();
  }, 1200000);

  function toggleMute(){
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: '='});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: '='});
    setTimeout(()=>{
      win.webContents.sendInputEvent({type: 'keyDown', keyCode: '-'});
      win.webContents.sendInputEvent({type: 'keyUp', keyCode: '-'});
    }, 10);
  }

  win.once('ready-to-show', () => {
    win.show()
  })
  globalShortcut.register('Shift+CommandOrControl+K', () => {
    clearInterval(currentInterval);
    console.log('Play/Pause');
    let wasMinimized = win.isMinimized();
    //win.focus();
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'Space'});
    if(wasMinimized){
      win.minimize();
    }
    currentInterval = setInterval(()=>{
      toggleMute();
    }, 1200000);
  })
  globalShortcut.register('CommandOrControl+Shift+J', () => {
    clearInterval(currentInterval);
    console.log("Prev");
    let wasMinimized = win.isMinimized();
    //win.focus();
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'K'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'K'});
    if(wasMinimized){
      win.minimize();
    }
    currentInterval = setInterval(()=>{
      toggleMute();
    }, 1200000);
  })
  globalShortcut.register('Shift+CommandOrControl+T', () => {
    clearInterval(currentInterval);
    console.log("Tets");
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'Space'});
    currentInterval = setInterval(()=>{
      toggleMute();
    }, 1200000);
  })
  globalShortcut.register('Shift+CommandOrControl+L', () => {
    clearInterval(currentInterval);
    console.log("Next");
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: 'J'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: 'J'});
    currentInterval = setInterval(()=>{
      toggleMute();
    }, 1200000);
  })
  globalShortcut.register('Shift+CommandOrControl+O', () => {
    clearInterval(currentInterval);
    console.log("Like");
    win.webContents.sendInputEvent({type: 'keyDown', keyCode: '+'});
    win.webContents.sendInputEvent({type: 'keyUp', keyCode: '+'});
    currentInterval = setInterval(()=>{
      toggleMute();
    }, 1200000);
  })
  globalShortcut.register('Shift+CommandOrControl+M', () => {
toggleMute();
  })
  const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  });
  blocker.enableBlockingInSession(session.defaultSession);
  // Load a remote URL
  win.loadURL('https://music.youtube.com');



}

app.on('ready', createWindow);
