'use strict'

// app:控制应用程序的事件生命周期
// protocol:注册自定义协议并拦截基于现有协议的请求。
// BrowserWindow:创建和控制浏览器窗口（应用程序窗口）
// Tray:添加图标和上下文菜单到系统通知区
// Menu:创建原生应用菜单和上下文菜单。
//screen: 检索有关屏幕大小、显示器、光标位置等的信息
// ipcMain:从主进程到渲染进程的异步通信。
import { app, protocol, BrowserWindow, Tray, Menu, screen, ipcMain, globalShortcut, MenuItem, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import axios from 'axios'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const fs = require('fs')
const { exec, child_process } = require('child_process')

// 设置运行内存350MB
process.env.NODE_OPTIONS = '--no-warnings --max-old-space-size=350'
// app.commandLine.appendSwitch('disable-site-isolation-trials');  // //这行一定是要加的，要不然无法使用iframe.contentDocument方法

// const exePath = path.dirname(app.getPath('exe'))

// console.log(exePath)
// console.log(child_process)
// console.log(process)

const menuContextTemplate = [
  { label: '复制', role: 'copy' }, // 使用了role，click事件不起作用
  { label: '粘贴', role: 'paste' }
]
const menuBuilder = Menu.buildFromTemplate(menuContextTemplate)

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


function showGoBackMenu (win) {
  const template = [{
    label: '返回',
    submenu: [{
      label: '返回上一页',
      click: () => { win.webContents.goBack() }
    }]
  },
    {
      label: '刷新', // 重新加载代码
      accelerator: 'CmdOrCtrl+R',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.reload()
        }
      }
    }
  ]
  // 构建菜单模版
  const m = Menu.buildFromTemplate(template)
  // 设置菜单模版
  Menu.setApplicationMenu(m)
}


/**
 * 动态加载打包后的配置文件
 */
function loadConfig() {
  // const jsonPath = path.join(__dirname, 'config.json');
  // console.log(jsonPath)
  // const res = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
  // console.log(res)
  // const { toStudentLogin, toTeacherLogin, toAdminLogin, openChromeWebSite, openLocalApp } = res
  // console.log(toStudentLogin)
  // console.log(toTeacherLogin)
  // console.log(toAdminLogin)
  // console.log(openChromeWebSite)
  // console.log(openLocalApp)

  // readConfig().then(res => {
  //   console.log(res)
  //   console.log(res.data)
  // }).catch(error => {
  //   console.error(error)
  // })


    // axios.get('/config.json')
    // .then(response => {
    //   console.log(response.data)
    //   const configFile = JSON.parse(response.data)
    //   console.log(configFile)
    // })
    // .catch(error => {
    //   console.error(error);
    // })
}

/**
 * 根据key获取配置文件的value
 */
function getConfigValueByKey(key) {
  let jsonPath = path.join(__dirname, '../src/config.json');
  // const nodeServerPath = path.join(process.resourcesPath, 'config.json');
  if (isDevelopment) {
    jsonPath = path.join(__dirname, '../src/config.json');
  } else {
    jsonPath = path.join(process.resourcesPath, 'config.json');
  }
  // console.log(jsonPath)
  // console.log(nodeServerPath)
  const res = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
  // const res = JSON.parse(fs.readFileSync(nodeServerPath, "utf-8"))
  // const { toStudentLogin, toTeacherLogin, toAdminLogin, openChromeWebSite, openLocalApp } = res

  console.log(res[key])

  return res[key]

  // console.log(toStudentLogin)
  // console.log(toTeacherLogin)
  // console.log(toAdminLogin)
  // console.log(openChromeWebSite)
  // console.log(openLocalApp)

  // readConfig().then(res => {
  //   console.log(res)
  //   console.log(res.data)
  // }).catch(error => {
  //   console.error(error)
  // })


  // axios.get('/config.json')
  // .then(response => {
  //   console.log(response.data)
  //   const configFile = JSON.parse(response.data)
  //   console.log(configFile)
  // })
  // .catch(er)ror => {
  //   console.error(error);
  // })
}

function callLocalProgram(program) {
  exec(program, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

export function getSystem() {
  //这是mac系统
  if (process.platform == "darwin") {
    return 1;
  }
  //这是windows系统
  if (process.platform == "win32") {
    return 2;
  }
  //这是linux系统
  if (process.platform == "linux") {
    return 3;
  }
}

/**
 * 获取安装路径
 */
export function getExePath() {
  // return path.dirname("C:");
  // console.log(fs)
  // console.log(path)
  // console.log(electron)
  // console.log(electron.shell)
  // console.log(electron.remote)
  // electron.shell.openExternal('https://www.baidu.com')
  return path.dirname(app.getPath("exe"));
}

/**
 * 获取配置文件路径
 */
export function getConfigPath() {
  if (getSystem() === 1) {
    return getExePath() + "/config.json";
  } else {
    return getExePath() + "\\config.json";
  }
}

/**
 * 读取配置文件
 */
export function readConfig() {
  return new Promise((res, rej) => {
    console.log("fs", fs)
    fs.readFile(getConfigPath(), "utf-8", (err, data) => {
      let config = ""
      if (data) {
        // 有值
        config = JSON.parse(data)
        console.log(config)
      }
      res(config)
    })
  })
}

//程序主窗口
let win = null;

async function createWindow() {
  let {
    width,
    height
  } = screen.getPrimaryDisplay().workArea;//自定义最大化窗口

  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: width,
    height: height,
    show: false,
    autoHideMenuBar: true, // 隐藏顶部工具栏，生产环境时设置为true
    // fullscreen: true, // 添加此行以使窗口默认全屏
    // 去除边框
    frame: false,
    // autoHideMenuBar: false,//自动隐藏菜单栏
    // fullscreen: false,
    // skipTaskbar: true,
    // center: true,
    maximizable: true,
    // resizable: true,
    webPreferences: {
      // 允许跨域
      webSecurity: false,
      nodeIntegration: true,  // 允许html页面上的javascipt代码访问nodejs 环境api代码的能力
      enableRemoteModule: true, // 是否允许使用remote
      contextIsolation: false, // 加载本地图片
      webviewTag: true // 允许webview
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  // 关闭导航栏选项
  win.setMenu(null)

  // win.maximize()
  // win.setAutoHideMenuBar(true)

  // win.loadURL('https://www.baidu.com');
  // win.loadURL('http://117.132.0.103:17743/#/');
  // win.loadURL('http://117.132.0.103:17743/#/loginStudent');
  // win.loadURL('http://117.132.0.103:17743/#/loginTeacher');

  // Open the DevTools.
  // win.webContents.openDevTools()



  // 监听控制台错误输出的事件
  // win.webContents.on('console-message', (event, level, message, line, sourceId) => {
  //   if (level === 3) { // 3 代表错误级别
  //     const logMessage = `[${timeStr}] ${message}\n`;
  //     fs.appendFileSync(logFilePath, logMessage);
  //     console.error(logMessage);
  //   }
  // });

  // 生产环境下隐藏此函数
  showGoBackMenu(win)
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools()
  })
  win.maximize()
  win.show()

  // createProtocol('app')

  // 1. 窗口 最小化
  ipcMain.on('window-min', function () { // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    win.minimize()
  })

  // 2. 窗口 最大化、恢复
  ipcMain.on('window-max', function () {
    if (win.isMaximized()) { // 为true表示窗口已最大化
      win.restore() // 将窗口恢复为之前的状态.
    } else {
      win.maximize()
    }
  })

  // 3. 关闭窗口
  ipcMain.on('window-close', function () {
    win.close()
  })

  // 刷新窗口
  ipcMain.on('window-reload', function () { // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    win.reload()
  })

  ipcMain.on('show-context-menu', function () {
    menuBuilder.popup({
      window: BrowserWindow.getFocusedWindow()
    })
  })

  // ipcMain.on('print-view', function () {
  //   const win = new BrowserWindow({ width: 800, height: 600 })
  //   // 打开新窗口 BrosweWindow 初始化
  //   win.loadURL('http://www.baidu.com')
  //   win.webContents.printToPDF({ pageSize: 'A4', printBackground: true }, (error, data) => {
  //     console.log('---------------------------------:', data)
  //     if (error) throw error
  //     fs.writeFile('print.pdf', data, (error) => {
  //       if (error) throw error
  //       console.log('Write PDF successfully.')
  //     })
  //   })
  // })

  // json: { downloadUrl: "", targetPath: "C:\\...", fileName: "config.json" }
  // ipcMain.on('system-update', function (event, { json, asar }) {
  //   console.log('system-update', asar)
  //   const request = require('request')
  //   const req = request({ method: 'GET', uri: json.downloadUrl })
  //   const out = fs.createWriteStream(json.targetPath)
  //   req.pipe(out)
  //   req.on('end', function () {
  //     const batPath = getFilePath('download.bat')
  //     // console.log("batPath", batPath)
  //     const fileData = `MatchDownloader.exe /opt url ${asar.downloadUrl} process Match-EMR.exe src ~/resources/update.asar dest ~/resources/app.asar`
  //     fs.writeFileSync(batPath, fileData)
  //     shell.openPath(batPath) // 打开bat文件
  //     app.quit() // 关闭应用
  //   })
  // })
}


var iconPath = path.join(__dirname, '../public/favicon.ico');

if (!isDevelopment) { //如果是生产环境
  iconPath = path.join(__dirname, './favicon.ico');
}

// 设置托盘区菜单
var appTray = null

function setTray() {
  //设置菜单内容
  let trayMenu = [{
    label: '首页', //菜单名称
    click: () => { //点击事件
      // win.loadURL('../public/index.html')
      // win.show()
      // createProtocol('app')
      // 加载构建好的Vue应用

      console.log('执行了首页点击事件')
      win.show()
      win.focus()
      // win.loadURL('app://./index.html')

      // win.loadFile('index.html');
      // win.loadFile('index.html')

      if (isDevelopment) {
        win.loadURL('file://' + __dirname + '/bundled/index.html');
      } else {
        win.loadURL('file://' + __dirname + '/index.html');
      }

      // win.loadURL('https://www.taobao.com')
    }
  }, {
    label: '退出', //菜单名称
    click: () => { //点击事件
      app.quit();
    }
  }];

  //设置托盘区图标
  // let trayIcon = path.join(__dirname, '../public/favicon.ico');

  appTray = new Tray(iconPath);

  //设置菜单
  const contextMenu = Menu.buildFromTemplate(trayMenu);
  //设置悬浮提示
  appTray.setToolTip('训练模拟系统');
  //设置
  appTray.setContextMenu(contextMenu);
  //点击图标
  appTray.on('click', function() {
    //显示主程序
    win.show();
  });
}


// on注册事件  send触发
//ipcMain 通信模块
function addIpc() {
  /**
   * 首页控制台新增控制方法
   */
  ipcMain.on('toStudentLogin', (event, url) => {
    const studentLogin = getConfigValueByKey('toStudentLogin')
    if (win) {
      win.loadURL(studentLogin);
    }
  })

  ipcMain.on('toTeacherLogin', (event, url) => {
    const teacherLogin = getConfigValueByKey('toTeacherLogin')
    if (win) {
      win.loadURL(teacherLogin);
    }
  })

  ipcMain.on('toAdminLogin', (event, url) => {
    const adminLogin = getConfigValueByKey('toAdminLogin')
    if (win) {
      win.loadURL(adminLogin);
    }
  })

  ipcMain.on('openChromeWebSite', (event, url) => {
    const chromeWebSite = getConfigValueByKey('openChromeWebSite')
    if (win) {
      shell.openExternal(chromeWebSite)
    }
  })

  ipcMain.on('openLocalApp', (event, url) => {
    const localApp = getConfigValueByKey('openLocalApp')
    // loadConfig()
    if (win) {
      callLocalProgram(localApp)
    }
  })
}



app.commandLine.appendSwitch('--disable-http-cache')

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
  setTray() //系统图表
  addIpc() //通信
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
