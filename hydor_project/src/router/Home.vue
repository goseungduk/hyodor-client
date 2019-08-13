<template>
<div>
  <h-nav></h-nav>
  <div id="app" ref="app">
    <p>안녕하세요 님!!</p>
  </div>
</div>
</template>
<script>
import NavbarVue from '../components/Navbar.vue';
export default{
  components: {
    'h-nav': NavbarVue
  }
}
</script>
<style scoped>
</style>
