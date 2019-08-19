const {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} = require("electron")
//const path = require('path')
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
module.exports = app => () => {
    if (app.$mainPage) {
        app.$mainPage.show()
        return app.$mainPage
    }
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 800,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    //secWin = new BrowserWindow({ width: 800, height: 600, parent: win });
    // 然后加载应用的 index.html。
    //win.loadFile('./build/index.html')
    win.loadURL("http://localhost:3000/#/mainPage/mission");
    win.webContents.openDevTools()
    // 打开开发者工具
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