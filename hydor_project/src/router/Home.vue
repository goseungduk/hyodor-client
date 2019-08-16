<template>
  <div>
    <h-nav current-page="home"></h-nav>
    <b-container class="mt-4">
      <p>안녕하세요 {{nick}} 님!!</p>
    </b-container>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
export default {
  computed:{
    nick(){
      return localStorage.username;
    }
  },
  components: {
    "h-nav": NavbarVue
  }
};
</script>
<style scoped>
</style>
