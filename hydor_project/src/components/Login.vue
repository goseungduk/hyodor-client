<template>
  <div id="container">
    <span id="example">
      <img src="../assets/logo.png" width="100" height="100" />
      지금 효도르를 시작해보세요!
    </span>
    <div class="mt-3">
      <b-form @submit="inLogin()" class="login-form">
        <b-form-group>
          <b-form-input name="id" placeholder="아이디" v-model="acc.id" :state="loginvalid"></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input name="pw" placeholder="비밀번호" v-model="acc.pw" :state="loginvalid"></b-form-input>
          <b-form-invalid-feedback :state="loginvalid" class="float-left">
            아이디 또는 비밀번호가 일치하지 않습니다.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button block variant="outline-primary" @click="inLogin()">로그인</b-button>
      </b-form>

      <br />
      <div>
        <p class="text-register">
          효도르에 처음이신가요?
          <b-link href="#">회원가입</b-link>
        </p>
      </div>
    </div>
    <loading v-show="isloading"></loading>
  </div>
</template>
<script>
import Constant from "../Constant";
//import {mapActions} from 'vuex';
import Loading from "./Loading";
import { mapState } from "vuex";
//import axios from 'axios';
export default {
  name: "login",
  components: { Loading },
  data: function() {
    return {
      acc: {}, // 비어있는 객체
      loginfailed: false
    };
  },
  created: function() {
    this.acc = { ...this.account };
    // 양방향 데이터 바인딩을 방지하는 구문
    // reference : https://github.com/stepanowon/vuejs_book_2nd
    // contactsapp_strict of chap.11
  },
  computed: {
    ...mapState(["account", "isloading"]),
    loginvalid: function() {
        if (this.loginfailed) {
            return false;
        }
        return null;
    }
  },
  methods: {
    inLogin() {
    //   if (this.acc.id == null || this.acc.pw == null) {
    //     alert("모두 입력해주세요!");
    //     return 0;
    //   } else if (this.acc.id == "" || this.acc.pw == "") {
    //     alert("모두 입력해주세요!");
    //     return 0;
    //   }
      if (this.acc.id == null || this.acc.pw == null) {
        this.loginfailed = true;
        return 0;
      } else if (this.acc.id == "" || this.acc.pw == "") {
        this.loginfailed = true;
        return 0;
      }
      this.$store
        .dispatch(Constant.LOGIN_GO, { account: this.acc })
        .then(() => {
          //dispatch의 then구문을 이어받음.s
          this.$router.push({ name: "home" });
          //alert("로그인 성공");
        })
        .catch(e => {
          //alert("로그인 실패", e);
          this.loginfailed = true;
          this.$store.dispatch(Constant.CHANGE_ISLOADING, { isloading: false });
        });
    }
  }
};
</script>
<style scoped>
#example {
  margin: 10px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 0px;
  position: relative;
  font: 13px "verdana";
}
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}

.text-register {
  font-size: 0.8em;
}

.login-form {
  margin: 0 auto;
  width: 300px;
}
</style>