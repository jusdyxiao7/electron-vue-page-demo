# rescue-desktop-app

项目基于 electron-quick-start 改造而成，采用 electron-builder 打包

适配 vue 2.x 框架，构建而成

node 版本 v15.0.0

npm 版本 7.0.2

实现基本的首页类桌面客户端布局，布局采用 element-ui 前端组件库

项目中引入了 Bootstrap 4.x，亦可结合项目适配使用

图标生成采用 electron-icon-builder

执行命令根据图片生成适配 windows 和 mac 的图标组

```
npm run electron:generate-icons
```

打包相关配置详见 vue.config.js

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
