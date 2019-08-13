<template>
    
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/home">Hyodor</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/home" :active="isactive('home')">일정</b-nav-item>
          <b-nav-item href="/boardlist" :active="isactive('boardlist')">커뮤니티</b-nav-item>
          
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          

          

          <b-nav-item-dropdown :text="username" right>
            
            <b-dropdown-item href="#">사용자 정보</b-dropdown-item>
            <b-dropdown-item href="#">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: 'hNav',
  components: {
    
  },
  props: ['currentPage'],
  computed: {
    ...mapState(["account"]),
    username: () => {
      // return "Username"
      return localStorage.username;
    },

  },
  methods: {
    isactive(route) {
      if (this.currentPage == route) {
        
        return true;
      }
      return false;
    }
  }
};
</script>


<style scoped>
</style>