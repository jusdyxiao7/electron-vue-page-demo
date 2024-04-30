/**
 * @作者 Conor Sun
 * @开源仓库 $ https://github.com/jusdyxiao7
 * @创建时间 2024/4/29 星期一 下午 16:16
 */
const { ipcRenderer } = require('electron')

// preload.js
document.addEventListener('DOMContentLoaded', (event) => {
  // 页面内容加载之后需要引入的一些操作
  // 需要增加延时，否则获取不到 dom 元素
  // console.log('加载成功开始执行')
  setTimeout(() => {
    baseViewFrontendUIAudioBtnShow()
  }, 2000)
})



// 监听主进程发送过来的消息
ipcRenderer.on('reload-page-buttons', () => {
  // 重新加载页面
  console.log('接收到了消息')
  baseViewFrontendUIAudioBtnShow()
  // window.location.reload();
});



/**
 * 主页面头部显示两个额外按钮
 * 语音识别
 * 内部通信
 */
function baseViewFrontendUIAudioBtnShow() {
  // const baseContainerElement = document.getElementById('electron-base-container') // 获取外包裹的container元素
  const innerCommunicationElement = document.getElementById('inner-com-electron-container') // 获取内部通信按钮元素
  const audioElement = document.getElementById('audio-electron-container') // 获取语音识别按钮元素

  // console.log(homePageElement)
  // console.log(baseContainerElement)
  // console.log(innerCommunicationElement)
  // console.log('baseViewFrontendUIAudioBtnShow')
  // console.log(audioElement)

  /**
   * 内部通信
   */
  if (innerCommunicationElement) {
    // console.log('进入了内部通信')
    innerCommunicationElement.style.display = ''; // 将 display 样式设置为空，使其采用默认值
    // 或者，如果你想显式设置它为某个特定的显示方式，比如 block：
    // innerCommunicationElement.style.display = 'block';
    innerCommunicationElement.onclick = function(e) {
      e.preventDefault() // 阻止按钮默认事件
      ipcRenderer.send('openLocalApp', 'openLocalApp')
    }
  }

  /**
   * 语音识别
   */
  if (audioElement) {
    // console.log('进入了语音识别')
    audioElement.style.display = ''; // 将 display 样式设置为空，使其采用默认值
    // 或者，如果你想显式设置它为某个特定的显示方式，比如 block：
    // audioElement.style.display = 'block';
    audioElement.onclick = function(e) {
      e.preventDefault() // 阻止按钮默认事件
      ipcRenderer.send('openLocalAppAudio', 'openLocalAppAudio')
    }
  }
}
