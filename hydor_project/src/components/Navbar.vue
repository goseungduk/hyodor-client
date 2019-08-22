<template>
  <div>
    <b-navbar toggleable="lg" style="background: linear-gradient( 45deg, #5153c2, #5f90df, #96d1f3 );">
      <b-navbar-brand class="hyodor" href="/home">
        <img src="../assets/logo2.png" class="hyodorlogo mr-1 align-top" />
        Hyodor
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            href="/home"
            :active="isactive('home')"
            :class="[isactive('home') ? 'n_active':'non_active']"
          >일정</b-nav-item>
          <b-nav-item
            href="/boardlist"
            :active="isactive('boardlist')"
            :class="[isactive('boardlist') ? 'n_active':'non_active']"
          >커뮤니티</b-nav-item>
          <b-nav-item
            href="/serviceinfo"
            :active="isactive('serviceinfo')"
            :class="[isactive('serviceinfo') ? 'n_active':'non_active']"
          >부모님을 위한 복지서비스</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="username" right>
            <b-dropdown-item href="/mypage">사용자 정보</b-dropdown-item>
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
  name: "hNav",
  components: {},
  props: ["currentPage"],
  computed: {
    ...mapState(["account"]),
    username: () => {
      // return "Username"
      return session.getNickname();
    }
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
.hyodorlogo {
  height: 1.4em;
}
.n_active {
  float: left;
}

.navbar .navbar-nav .nav-link {
  color: white !important;
}
.non_active {
  color: white;
  font-weight: bold;
  text-align: center;
}
.hyodor{
  color: white;
}
@media (max-width: 720px) {
  .n_active {
    font-weight: bold;
    background-color:  rgba( 0, 0, 0, 0.07 );
    text-align: center;

  }
  .non_active:hover {
    font-weight: bold;
    background-color: white;
    background-color:  rgba( 0, 0, 0, 0.07 );
    text-align: center;
  }
  

}
@media (min-width: 720px) and (max-width: 990px) {
  .n_active {
    font-weight: bold;
    background-color: white;
    background-color:  rgba( 0, 0, 0, 0.07 );
    text-align: center;
  }
  .non_active:hover {
    font-weight: bold;
    background-color: white;
    background-color:  rgba( 0, 0, 0, 0.07 );
    text-align: center;
  }
}
@media (min-width: 990px) {
  .n_active {
    font-weight: bold;
    text-decoration: none;
    border-bottom: 2px solid white;
  }
  .non_active:hover {
    font-weight: bold;
    border-bottom: 2px solid white;
  }
}

</style>