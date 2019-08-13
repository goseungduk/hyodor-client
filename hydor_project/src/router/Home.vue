<template>
  <div>
    <h-nav current-page="home"></h-nav>
    <div id="app" ref="app">
      <p>안녕하세요 {{nick}} 님!!</p>
    </div>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
export default {
  computed:{
    nick(){
      return localStorage.access_token
    }
  },
  components: {
    "h-nav": NavbarVue
  }
};
</script>
<style scoped>
</style>
