/**
 * @作者 Conor Sun
 * @开源仓库 $ https://github.com/jusdyxiao7
 * @创建时间 2024/4/29 星期一 下午 16:25
 */
const { BrowserWindow } = require('electron')
const path = require('path')

class AppWindow extends BrowserWindow {
  constructor(config, urlLocation) {
    const basicConfig = {
      minWidth: 800,
      minHeight: 600,
      width: 800,
      height: 600,
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
        webviewTag: true, // 允许webview
        // 支持多线程
        nodeIntegrationInWorker: true,
        nodeIntegrationInSubFrames: true, //放开权限
        // plugins: true,
        // allowDisplayingInsecureContent: true
        preload: path.join(__dirname, 'preload.js')
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      }
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadURL(urlLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = AppWindow
