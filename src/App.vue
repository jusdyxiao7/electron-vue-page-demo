<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <StartPage/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import StartPage from './components/StartPage'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    StartPage
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
