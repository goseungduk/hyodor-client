<template>
<div id="app">
  <router-view></router-view>
</div>
</template>
<script>

export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poor+Story&display=swap&subset=korean');

#app {
  font-family: 'Poor Story', cursive;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
