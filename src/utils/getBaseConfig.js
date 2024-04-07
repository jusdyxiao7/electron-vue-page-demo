const path = window.require && window.require("path")
const fs = window.require && window.require("fs")
const electron = window.require && window.require('electron')

// import { path } from 'path'
// import { fs } from 'fs'
// import { app, protocol, BrowserWindow, electron, shell } from 'electron'

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
 *
 * @returns 获取安装路径
 */
export function getExePath() {
  // return path.dirname("C:");
  // console.log(fs)
  // console.log(path)
  // console.log(electron)
  // console.log(electron.shell)
  // console.log(electron.remote)
  // electron.shell.openExternal('https://www.baidu.com')
  return path.dirname(electron.remote.app.getPath("exe"));
}
/**
 *
 * @returns 获取配置文件路径
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
        //有值
        config = JSON.parse(data)
      }
      res(config)
    })
  })
}
