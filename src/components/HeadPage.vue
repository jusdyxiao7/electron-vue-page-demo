<template>
  <div class="page-container">
    <div class="top-header-wrapper">
      <span class="top-header-text">航空搜救任务训练模拟系统</span>
    </div>

    <div class="base-item-container">
      <div class="tool-tip-wrapper">
        <div class="tool-tip-image-wrapper">
          <img
              class="image_6"
              referrerpolicy="no-referrer"
              src="../assets/student.png"
          />
        </div>
        <div class="tool-tip-image-wrapper">
          <img
              class="image_7"
              referrerpolicy="no-referrer"
              src="../assets/teacher.png"
          />
        </div>
        <div class="tool-tip-image-wrapper">
          <img
              class="image_8"
              referrerpolicy="no-referrer"
              src="../assets/extra.png"
          />
        </div>
      </div>

      <div class="tool-button-container-wrapper">
        <div class="tool-button-wrapper">
            <div class="tool-button-image-wrapper" @click="toStudentLogin">
              <img
                class="image"
                referrerpolicy="no-referrer"
                :src="studentCoordinateImageSrc"
                @mouseover="changeImageActive('toStudentLogin')"
                @mouseleave="changeImageInactive('toStudentLogin')"
              />
            </div>
            <div class="tool-button-image-wrapper" @click="toStudentOtherLogin">
              <img
                class="image"
                referrerpolicy="no-referrer"
                :src="studentCommandImageSrc"
                @mouseover="changeImageActive('toStudentOtherLogin')"
                @mouseleave="changeImageInactive('toStudentOtherLogin')"
              />
            </div>
        </div>

        <div class="tool-button-wrapper">
          <div class="tool-button-image-wrapper" @click="toTeacherLogin">
            <img
                class="image"
                referrerpolicy="no-referrer"
                :src="teacherMonitorImageSrc"
                @mouseover="changeImageActive('toTeacherLogin')"
                @mouseleave="changeImageInactive('toTeacherLogin')"
            />
          </div>
        </div>

        <div class="tool-button-wrapper">
          <div class="tool-button-image-wrapper" @click="openChromeWebSite">
            <img
                class="image"
                referrerpolicy="no-referrer"
                :src="openAppAudioImageSrc"
                @mouseover="changeImageActive('openChromeWebSite')"
                @mouseleave="changeImageInactive('openChromeWebSite')"
            />
          </div>
          <div class="tool-button-image-wrapper" @click="openLocalApp">
            <img
                class="image"
                referrerpolicy="no-referrer"
                :src="openAppInternalCommunicationImageSrc"
                @mouseover="changeImageActive('openLocalApp')"
                @mouseleave="changeImageInactive('openLocalApp')"
            />
          </div>
        </div>

      </div>
    </div>

    <div class="footer">
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = window.require('electron')

export default {
  name: "HeadPage",
  props: {},
  data() {
    return {
      toStudentLoginUrl: 'https://www.baidu.com',
      toStudentOtherLoginUrl: 'https://www.zhihu.com',
      toTeacherLoginUrl: 'https://www.jd.com',
      toAdminLoginUrl: 'https://www.taobao.com',

      // 默认图片url
      defaultLogoUrl: '../assets/logo.png',

      // 搜救任务协调
      studentCoordinateImageSrc: require('../assets/renwuxietiao.png'),
      studentCoordinateImageInactiveSrc: require('../assets/renwuxietiao.png'),
      studentCoordinateImageActiveSrc: require('../assets/renwuxietiao-active.png'),
      // 搜救任务指挥
      studentCommandImageSrc: require('../assets/renwuzhihui.png'),
      studentCommandImageInactiveSrc: require('../assets/renwuzhihui.png'),
      studentCommandImageActiveSrc: require('../assets/renwuzhihui-active.png'),
      // 导调监控
      teacherMonitorImageSrc: require('../assets/daotiaojiankong.png'),
      teacherMonitorImageInactiveSrc: require('../assets/daotiaojiankong.png'),
      teacherMonitorImageActiveSrc: require('../assets/daotiaojiankong-active.png'),
      // 语音识别
      openAppAudioImageSrc: require('../assets/yuyinshibie.png'),
      openAppAudioImageInactiveSrc: require('../assets/yuyinshibie.png'),
      openAppAudioImageActiveSrc: require('../assets/yuyinshibie-active.png'),
      // 内部通信
      openAppInternalCommunicationImageSrc: require('../assets/neibutongxin.png'),
      openAppInternalCommunicationImageInactiveSrc: require('../assets/neibutongxin.png'),
      openAppInternalCommunicationImageActiveSrc: require('../assets/neibutongxin-active.png'),
      constants: {},
    }
  },
  methods: {
    /**
     * 鼠标移入事件
     */
    changeImageActive(key) {
      if (key === 'toStudentLogin') {
        // 搜救任务协调
        this.studentCoordinateImageSrc = this.studentCoordinateImageActiveSrc
      } else if (key === 'toStudentOtherLogin') {
        // 搜救任务指挥
        this.studentCommandImageSrc = this.studentCommandImageActiveSrc
      } else if (key === 'toTeacherLogin') {
        // 导调监控
        this.teacherMonitorImageSrc = this.teacherMonitorImageActiveSrc
      } else if (key === 'openChromeWebSite') {
        // 语音识别
        this.openAppAudioImageSrc = this.openAppAudioImageActiveSrc
      } else if (key === 'openLocalApp') {
        // 内部通信
        this.openAppInternalCommunicationImageSrc = this.openAppInternalCommunicationImageActiveSrc
      } else {
        // TODO 其余待扩展

      }
    },
    /**
     * 鼠标离开事件
     */
    changeImageInactive(key) {
      if (key === 'toStudentLogin') {
        this.studentCoordinateImageSrc = this.studentCoordinateImageInactiveSrc
      } else if (key === 'toStudentOtherLogin') {
        // 搜救任务指挥
        this.studentCommandImageSrc = this.studentCommandImageInactiveSrc
      } else if (key === 'toTeacherLogin') {
        // 导调监控
        this.teacherMonitorImageSrc = this.teacherMonitorImageInactiveSrc
      } else if (key === 'openChromeWebSite') {
        // 语音识别
        this.openAppAudioImageSrc = this.openAppAudioImageInactiveSrc
      } else if (key === 'openLocalApp') {
        // 内部通信
        this.openAppInternalCommunicationImageSrc = this.openAppInternalCommunicationImageInactiveSrc
      } else {
        // TODO 其余待扩展

      }
    },
    toStudentLogin() {
      // const exePath = getExePath();
      ipcRenderer.send('toStudentLogin', this.toStudentLoginUrl)
      // console.log(exePath)
    },
    toStudentOtherLogin() {
      // const exePath = getExePath();
      ipcRenderer.send('toStudentOtherLogin', this.toStudentOtherLoginUrl)
      // console.log(exePath)
    },
    toTeacherLogin() {
      ipcRenderer.send('toTeacherLogin', this.toTeacherLoginUrl)
      // const system = getSystem();
      // console.log(system)
    },
    toAdminLogin() {
      ipcRenderer.send('toAdminLogin', this.toAdminLoginUrl)
      // const abc = readConfig();
      // console.log(abc)
    },
    openChromeWebSite() {
      ipcRenderer.send('openChromeWebSite', 'openChromeWebSite')
      // const abc = readConfig();
      // console.log(abc)
    },
    openLocalApp() {
      ipcRenderer.send('openLocalApp', 'openLocalApp')
      // const abc = readConfig();
      // console.log(abc)
    }
  }
}
</script>
<style src="./common.css"/>
<style src="./index.css"/>
