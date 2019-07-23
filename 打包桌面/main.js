const {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} = require("electron")
const fs = require('fs')
//const path = require('path')
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;
const xlsx = require('node-xlsx')
function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences:{
      nodeIntegration:true
    }
  });
  //secWin = new BrowserWindow({ width: 800, height: 600, parent: win });
  // 然后加载应用的 index.html。
  //win.loadFile('./build/index.html')
  win.loadURL("http://localhost:3000/");
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
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on("ready", createWindow);

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
    createWindow();
  }
});

ipcMain.on('saveMessage',(event,data) => {
  fs.writeFile('./data.json',data,(err) => {
    if(err){
      console.log(err)
    }
  })
})
ipcMain.on('loadStore',(event,str) => {
  fs.readFile('./data.json',{encoding:'utf-8'},(err, data) => {
    if(err){
      event.sender.send('replyStore', false)
    } else {
      event.sender.send('replyStore', data)
    }
  })
})
ipcMain.on('chooseFile',(event,str) => {
  dialog.showOpenDialog({
    title:'选择文件',
      filters: [
        { name: 'excel', extensions: ['xlsx'] }
      ]
    //defaultPath:"C:\\Users\\俞建涛\\Desktop\\毕业设计"
  },(filePath) => { 
    var obj = xlsx.parse(filePath[0]);
    console.log(JSON.stringify(obj));
  })
})
// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。