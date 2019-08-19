const {
  BrowserWindow,
  ipcMain,
} = require("electron")

module.exports = app => () => {
  if (app.$ls) {
    app.$ls.show()
    return app.$ls
  }
  var win = new BrowserWindow({
    width: 300,
    height: 450,
    resizable: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  //secWin = new BrowserWindow({ width: 800, height: 600, parent: win });
  // 然后加载应用的 index.html。
  //win.loadFile('./build/index.html')
  win.loadURL("http://localhost:3000/#/ls");
  win.webContents.openDevTools()
  win.on("ready-to-show", () => {
    win.show();
  });
  // 当 window 被关闭，这个事件会被触发。
  win.on("closed", () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null;
  });
  win.on('maximize', (event) => {
    event.sender.send('maximize')
  })
  win.on('unmaximize', (event) => {
    event.sender.send('unmaximize')
  })

  // Electron 会在初始化后并准备
  // 创建浏览器窗口时，调用这个函数。
  // 部分 API 在 ready 事件触发后才能使用。
  ipcMain.on('minimize', () => {
    if (win) {
      win.minimize()
    }
  })
  ipcMain.on('closeWin', () => {
    if (win) {
      win.close()
      win = null
    }
  })
  ipcMain.on('changeWinSize', (event, data) => {
    if (data && win) {
      win.unmaximize()
    } else if (win) {
      win.maximize()
    }
  })
  return win
}