# 客户端安装及环境配置说明

项目基于 electron-quick-start 改造而成，采用 electron-builder 打包

适配 vue 2.x 框架，构建而成

node 版本 v15.0.0

npm 版本 7.0.2

实现基本的首页类桌面客户端布局，布局采用 element-ui 前端组件库

项目中引入了 Bootstrap 4.x，亦可结合项目适配使用


## 准备工作


npm 全局安装electron及打包相关命令


```
npm install -g electron
npm install -g electron-builder
```


## 项目初始化


```
npm install
```


### npm install 安装报错解决办法


下载依赖安装环境，会存在网络等原因出现失败的情况，需要重新配置镜像源

命令行中，执行命令，设置npm镜像源和electron镜像源

```
npm config edit
```

填入electron配置信息，保存

```
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```


## 本地dev环境运行调试项目


```
npm run electron:serve
```


## 打包生产环境客户端


```
npm run electron:build
```


打包相关配置详见 vue.config.js

图标生成采用 electron-icon-builder

执行命令根据图片生成适配 windows 和 mac 的图标组

```
npm run electron:generate-icons
```


## 打包后外部应用配置匹配关系


打包后，生成目录 dist_electron 中，resources下的 config.json 文件，可动态配置


| 页面元素     | config配置文件名key | 配置说明           | 示例                                           |
| ------------ | ------------------- | ------------------ | ---------------------------------------------- |
| 搜救任务协调 | toStudentLogin      | url地址            | http://117.132.0.103:17743/#/loginStudent      |
| 搜救任务指挥 | toStudentLoginOther | url地址            | http://117.132.0.103:17743/#/loginStudentOther |
| 导调监控     | toTeacherLogin      | url地址            | http://117.132.0.103:17743/#/loginTeacher      |
| 内部通信     | openLocalApp        | 本地应用程序全路径 | notepad.exe                                    |
| 语音识别     | openLocalAppAudio   | 本地应用程序全路径 | E:\\Tencent\\WeChat\\WeChat.exe                |


## 两种方案对比


### 方案一：自定义事件派发和 preload.js 监听


当能修改原始项目源码时可以采用如下方式，在原始项目加载成功后触发一个自定义事件，在 preload.js 中监听自定义事件，进行额外的 dom 处理。


1. 由 vue 原始项目内部自己手动触发自定义事件

```
// 解决方案一：其中的内部事件派发，由 vue 项目内部自己手动触发，此处可以监听到

mounted() {
  // 向 electron 发送自定义事件
  var myEvent = new Event('reload-electron-page-buttons')
  // 触发自定义事件
  document.dispatchEvent(myEvent)
  // console.log('触发了自定义事件')
  // console.log('执行了')
},
```

2. electron 中的 preload.js 渲染函数中监听自定义事件，进行处理

```
// 监听自定义事件 - 显示 electron 两个按钮 - 语音识别 + 内部通信
document.addEventListener('reload-electron-page-buttons', () => {
  console.log('Custom event reload-electron-page-buttons triggered!');
  baseViewFrontendUIAudioBtnShow()
});
```


### 方案二：主进程 main.js 中监听 路由变化


主进程中监听路由发生变化，每次路由变化，都会执行对应的处理函数

```
  // 解决方案二：主进程中监听路由发生变化
  // 此种处理方案，每次页面路由发生变化，都会触发下面监听的方法的执行
  win.webContents.on("did-finish-load", function() {
    // ...
    // 这里放注入代码逻辑
    // ...
    console.log('did-finish-load')
  });

  win.webContents.on('did-start-navigation', _ => {
    console.log('did-start-navigation')
  });
  win.webContents.on('will-navigate', _ => {
    console.log('will-navigate')
  });
  win.webContents.on('did-navigate-in-page', _ => {
    console.log('發送消息了 - did-navigate-in-page')
    // 获取目标渲染进程的webContents对象
    // const targetWindow = electron.BrowserWindow.getAllWindows()[0]; // 假设是第一个窗口
    // const targetWebContents = targetWindow.webContents;
    // 向目标渲染进程发送消息
    // console.log(win.webContents)
    win.webContents.send('reload-page-buttons');

  }); 
```
