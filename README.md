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


