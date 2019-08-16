<template>
  <div>
    <b-container class="mainscreen mt-5">
      <h2>효도르 회원가입</h2>
      <div>
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-form-input v-model="form.username" placeholder="아이디" required></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="form.password" type="password" placeholder="비밀번호" required></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="form.email" type="email" placeholder="이메일" required></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="form.nickname" placeholder="닉네임" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">회원가입</b-button>
        </b-form>
      </div>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios';
import * as session from "../utils/loginService.js";

export default {
  name: 'register',
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        nickname: ""
      }
    };
  },
  computed: {

  },
  components: {
    
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var payloads = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        nickname: this.form.nickname
      };
      
      axios.put(session.apiurl + "login", payloads)
      .then(function (response) {
        alert("회원가입이 완료되었습니다. 다시 로그인해 주세요.");
        this.$router.push({ name: "login" });
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status == 409) {
            alert("중복된 아이디 또는 비밀번호");
            return;
          }
          else if (error.response.status == 400) {
            alert("잘못된 입력값");
            return;
          }
        }
        alert("알 수 없는 오류");
      })
    }
  }
};
</script>
<style scoped>


.mainscreen {
}
</style>
