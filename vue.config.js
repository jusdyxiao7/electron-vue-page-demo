const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  pluginOptions: {
    // electronBuilder配置
    electronBuilder: {
      builderOptions: {
        // productName: "态势显控教员端",//生成exe的名字(允许为汉字)
        // productName: "态势显控学员端",//生成exe的名字(允许为汉字)
        productName: "训练模拟系统",//生成exe的名字(允许为汉字)
        copyright: "Copyright @ 2024 ${author}",//版权信息
        extraResources: [
          {
            from: "./src/config.json",
            to: "../resources"
          }
        ],
        directories: { // 输出文件夹(不修改则默认在dist_electron下)
          output: "dist_electron",
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。若为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, //是否允许修改安装目录
          installerIcon: "./build/icons/icon.ico",// 安装时图标(所有路径均相对根目录)
          uninstallerIcon: "./build/icons/icon.ico",//卸载时图标
          installerHeaderIcon: "./build/icons/icon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 是否创建桌面图标
          createStartMenuShortcut: true,// 是否创建开始菜单图标
          shortcutName: "${productName}", // 快捷方式名称
          runAfterFinish: false,//是否安装完成后运行
        },
        win: {
          icon: "build/icons/icon.ico",//图标路径
          target: [
            {
              target: "nsis", //利用nsis制作安装程序
              arch: [
                "x64", //64位
                "ia32" //32位
              ]
            },
            // {
            //   target: "portable", //便携式
            //   arch: [
            //     "x64", //64位
            //     // "ia32" //32位
            //   ]
            // },
            {
              target: "zip",
              arch: [
                "x64", //64位
                // "ia32" //32位
              ]
            }
          ],
          artifactName: "${productName}-Windows-${version}-Setup.${ext}"
        }
        // mac: {
        //   icon: "build/icons/icon.icns",
        //   target: [
        //     {
        //       target: "dmg",
        //       arch: [
        //         "x64", //64位
        //         // "ia32" //32位
        //       ]
        //     },
        //     {
        //       target: "zip",
        //       arch: [
        //         "x64", //64位
        //         // "ia32" //32位
        //       ]
        //     }
        //   ],
        //   artifactName: "${productName}-Mac-${version}-Installer.${ext}"
        // }
        // linux: {
        //   icon: "build/icons/icon.ico"
        // }
      }
    }
  }
})
