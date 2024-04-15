<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <StartPage/> -->
<!--     <head-page />-->
<!--    <custom-page />-->
    <new-page />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import StartPage from './components/StartPage'
// import HeadPage from './components/HeadPage'
// import CustomPage from './components/CustomPage'
import NewPage from './components/NewPage.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // StartPage
    // HeadPage,
    // CustomPage
    NewPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
