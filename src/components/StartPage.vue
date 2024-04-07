<template>
  <div class="base-page-container">
    <div class="title">
      航空搜救任务训练模拟系统
    </div>
<!--    <h3 @click="toStudentLogin">toStudentLogin</h3>
    <h3 @click="toTeacherLogin">toTeacherLogin</h3>
    <h3 @click="toAdminLogin">toAdminLogin</h3>
    <h3 @click="openChromeWebSite">浏览器打开网页</h3>
    <h3 @click="openLocalApp">打开本地应用程序</h3>
    <el-button type="primary" @click="handleClick()">点击</el-button>-->
    <div class="base-view-container">
      <el-row type="flex" class="row-bg row-item-container" justify="start">
          <el-col :span="spanRowLeft">
            <div class="sub-item">
              <div class="nav-title-container">
                <span class="nav-title-text">学员</span>
              </div>
            </div>
          </el-col>
        <el-col :span="spanRowRight">
          <div class="sub-item card-item-container" @click="toStudentLogin">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="firstRowList[0]" class="image">
              <div style="padding: 14px;">
                <span>搜救任务协调</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="spanRowRight">
          <div class="sub-item card-item-container" @click="toAdminLogin">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="firstRowList[1]" class="image">
            <div style="padding: 14px;">
              <span>搜救任务指挥</span>
            </div>
          </el-card>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg row-item-container" justify="start">
        <el-col :span="spanRowLeft">
          <div class="sub-item">
            <div class="nav-title-container">
              <span class="nav-title-text">教员</span>
            </div>
          </div>
        </el-col>
        <el-col :span="spanRowRight">
          <div class="sub-item card-item-container" @click="toTeacherLogin">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="secondRowList[0]" class="image">
            <div style="padding: 14px;">
              <span>导调监控</span>
            </div>
          </el-card>
          </div>
        </el-col>
        <el-col :span="spanRowRight" v-show="false">
          <div class="sub-item card-item-container">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="secondRowList[1]" class="image">
              <div style="padding: 14px;">
                <span>导调监控</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg row-item-container" justify="start">
        <el-col :span="spanRowLeft">
          <div class="sub-item">
            <div class="nav-title-container">
              <span class="nav-title-text">通用</span>
            </div>
          </div>
        </el-col>
        <el-col :span="spanRowRight">
          <div class="sub-item card-item-container" @click="openChromeWebSite">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="thirdRowList[0]" class="image">
            <div style="padding: 14px;">
              <span>语音识别</span>
            </div>
          </el-card>
          </div>
        </el-col>
        <el-col :span="spanRowRight">
          <div class="sub-item card-item-container" @click="openLocalApp">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="thirdRowList[1]" class="image">
            <div style="padding: 14px;">
              <span>内部通信</span>
            </div>
          </el-card>
          </div>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
// import { getExePath, readConfig, getSystem } from '@/utils/getBaseConfig'
// import { ipcRenderer } from 'electron'
const { ipcRenderer } = window.require('electron')

export default {
  name: "StartPage",
  props: {

  },
  data() {
    return {
      toStudentLoginUrl: 'https://www.baidu.com',
      toTeacherLoginUrl: 'https://www.jd.com',
      toAdminLoginUrl: 'https://www.taobao.com',

      // 默认图片url
      defaultLogoUrl: '../assets/logo.png',

      // 一行 24 等分，每个处理多少
      spanRowLeft: 6,
      spanRowRight: 9,

      // 每行目前放 2 个
      firstRowList: [
        'androiddeveloperfundamentals_logo.png',
        'home_twitter_logo_blue.png'
      ],
      secondRowList: [
        'VoiceRecorderLogoExtensions.targetsize-336.png',
        'logotest.png'
      ],
      thirdRowList: [
        'Compositor-HDRPTemplateWithLogo.png',
        'probuilder_unitylogo.png'
      ]

    }
  },
  created() {

  },
  mounted() {
    // console.log(electron)
    // console.log(ipcRenderer)
  },
  methods: {
    handleClick() {
      // console.log('click按钮点击事件')
    },
    toStudentLogin() {
      // const exePath = getExePath();
      ipcRenderer.send('toStudentLogin', this.toStudentLoginUrl)
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

<style scoped>
/* 上方标题 */
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #3a8ee6;
  font-size: 50px;
  height: 300px;
  overflow: hidden;
}

/* 下方主窗口 */
.base-view-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 330px);
  overflow: hidden;
}

/* 每行容器 */
.row-item-container {
  width: 100%;
  height: calc(33vh - 110px);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sub-item {
  margin-top: 30px;
  margin-right: 20px;
}

/* card容器-包含图片和文字的 */
.card-item-container {
  cursor: pointer;
}

/* 下方左侧标题 */
.nav-title-container {
  padding: 14px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

/* 标题文字 */
.nav-title-text {
  color: #3a8ee6;
  font-size: 50px;
}

/* 图片 */
.image {
  width: 100%;
  height: calc(33vh - 180px);
  display: block;
}
</style>
