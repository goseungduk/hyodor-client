<template>
    
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
          <b-nav>
            <b-nav-item href="/home" class="hydorlogo"><img onclick="location.href='/home'" class="mr-2" src="../assets/logo2.png" width="40" height="30" /></b-nav-item>
          </b-nav>

          <b-navbar-brand  class="hyodor" href="/home">Hyodor</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/home" :active="isactive('home')" :class="[isactive('home') ? 'n_active':'non_active']" >일정</b-nav-item>
          <b-nav-item href="/boardlist" :active="isactive('boardlist')" :class="[isactive('boardlist') ? 'n_active':'non_active']" >커뮤니티</b-nav-item>
          <b-nav-item onclick="location.href='http://api.korea.go.kr/openapi/svc/list?lrgAstCd=060000&jrsdOrgCd=3110000&format=html&serviceKey=EzpVCm%2By8ApwlDIaSCc%2BzV%2FXiHxgmrx8LE4EHCWpiRIjIkoeFTsarW7ypISPwiMsPGIXWC7FPpy2VdNCCa%2BUQg%3D%3D'" :active="isactive('board')" :class="[isactive('#') ? 'n_active':'non_active']" >복지정보(demo)</b-nav-item>  
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          

          

          <b-nav-item-dropdown :text="username" right>
            
            <b-dropdown-item href="#">사용자 정보</b-dropdown-item>
            <b-dropdown-item @click="logout()">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </div>
</template>


<script>
import { mapState } from "vuex";
import * as session from "../utils/loginService.js";

export default {
  name: 'hNav',
  components: {
    
  },
  props: ['currentPage'],
  computed: {
    ...mapState(["account"]),
    username: () => {
      // return "Username"
      return session.getNickname();
    },

  },
  methods: {
    isactive(route) {
      if (this.currentPage == route) {
        
        return true;
      }
      return false;
    },
    logout() {
      session.logout();
      this.$router.push("/login");
    }
  }
};
</script>


<style scoped>
.hydorlogo{
  border:1px solid #f8f9fa;
}
.hydorlogo:hover{
  background-color: #f1f1f1;
}
.n_active{
float:left;
}
.n_active { font-weight:bold; 
 text-decoration:none; border-bottom: 2px solid #026CAD;
}
.navbar .navbar-nav .nav-link {
  color: #026CAD!important
}
.non_active{
  color:#3764CC; font-weight:bold;
}
.non_active:hover{
  font-weight: bold;
  border-bottom: 2px solid #026CAD;
}
.hyodor:hover{
  color:#026CAD;
}

</style>