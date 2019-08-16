<template>
  <div>
    <b-container class="mt-5">
      <h2>효도르 회원가입</h2>
      <div>
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-form-input v-model="form.username" placeholder="아이디" :state="isValid(errormsg.username)"></b-form-input>
            <b-form-invalid-feedback :state="isValid(errormsg.username)">{{ errormsg.username }}</b-form-invalid-feedback>
            
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="form.password" type="password" placeholder="비밀번호" :state="isValid(errormsg.password)"></b-form-input>
            <b-form-invalid-feedback :state="isValid(errormsg.password)">{{ errormsg.password }}</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="form.email" type="email" placeholder="이메일" :state="isValid(errormsg.email)"></b-form-input>
            <b-form-invalid-feedback :state="isValid(errormsg.email)">{{ errormsg.email }}</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="form.nickname" placeholder="닉네임" :state="isValid(errormsg.nickname)"></b-form-input>
            <b-form-invalid-feedback :state="isValid(errormsg.nickname)">{{ errormsg.nickname }}</b-form-invalid-feedback>
          </b-form-group>
          <b-button type="submit" variant="primary">회원가입</b-button>
        </b-form>
      </div>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import * as session from "../utils/loginService.js";

export default {
  name: "register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        nickname: ""
      },
      errormsg: {
        username: "",
        password: "",
        email: "",
        nickname: ""
      }
    };
  },
  computed: {
    
  },
  components: {},
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var payloads = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        nickname: this.form.nickname
      };

      this.errormsg.username = "";
      this.errormsg.password = "";
      this.errormsg.email = "";
      this.errormsg.nickname = "";

      var nthis = this;

      axios
        .put(session.apiurl + "login", payloads)
        .then(function(response) {
          alert("회원가입이 완료되었습니다. 다시 로그인해 주세요.");
          nthis.$router.push({ name: "login" });
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status == 409 || error.response.status == 400) {
              let errdat = error.response.data;
              if (errdat['username']) {
                nthis.errormsg.username = errdat['username'];
              }
              if (errdat['password']) {
                nthis.errormsg.password = errdat['password'];
              }
              if (errdat['email']) {
                nthis.errormsg.email = errdat['email'];
              }
              if (errdat['nickname']) {
                nthis.errormsg.nickname = errdat['nickname'];
              }

              return;
            }
          }
          alert("알 수 없는 오류");
        });
    },

    isValid(errmsg) {
      if (errmsg == "") {
        return null;
      }
      return false;
    }
  }
};
</script>
<style scoped>

/* PC */
@media (min-width: 1200px) { 
    .container{
        max-width: 400px;
    }
}

/* PC and Tablet */
@media (min-width: 992px) {
    .container{
        max-width: 400px;
    }
}

/* Tablet */
@media (min-width: 768px) {
    .container{
        max-width: 400px;
    }
}
</style>
