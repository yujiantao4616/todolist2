const {
  app,
  ipcMain,
  BrowserWindow
} = require('electron')
//import mainPage from './windows/main'
const ls = require('./windows/ls')
const mainPage = require('./windows/main.js')
class todolist {
  $mainPage = null //首页
  $ls = null //登录注册页
  constructor() {
    this.init()
  }
  // test for git
  async init() {
    app.on("ready", this.initls);
    // 当全部窗口关闭时退出。
    app.on("window-all-closed", () => {
      // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
      // 否则绝大部分应用及其菜单栏会保持激活。
      // win.webContents.send('saveStore','saveStore')
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      // 在macOS上，当单击dock图标并且没有其他窗口打开时，
      // 通常在应用程序中重新创建一个窗口。
      if (win === null) {
        this.initls();
      }
    });
  }
  initls = () => {
    BrowserWindow.addDevToolsExtension('D:/chromeExt/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0')
    this.$ls = ls(this)()
  }
  initMainPage = () => {
    this.$mainPage = mainPage(this)()
  }
  changeWin(winNameHide, winNameShow) {
    this[`$${winNameHide}`].close()
    this[`$${winNameHide}`] = null
    if (this[`$${winNameShow}`]) {
      this[`$${winNameShow}`].show()
    } else {
      if (winNameShow === 'mainPage') {
        this.initMainPage()
      }
    }

  }
}

var todolist1 = new todolist()
ipcMain.on('changeWin', (event, winNameHide, winNameShow) => {
  todolist1.changeWin(winNameHide, winNameShow)
})