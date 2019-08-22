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
          <b-button type="submit" variant="outline-primary" class="fleft">회원가입</b-button>
        </b-form>
        
      </div>
      
    </b-container>
    <br>
    
    <b-container class="mt-3" ><h5 style="text-align: center;"> 개인정보 처리방침 동의</h5>
    <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info"> 개인정보처리방침</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          
          <b-card-text style="font-size:15px;"><ul><li><효도르>가 취급하는 모든 개인정보는 관련 법령에 근거하여 수집 · 보유 및 처리되고 있습니다.</li> 
          <li>「개인정보보호법」은 이러한 개인정보의 취급에 대한 일반적 규범을 제시하고 있으며, <효도르>은 이러한 법령의 규정에 따라 수집 · 보유 및 처리하는 개인정보를 공공업무의 적절한 수행과 이용자의 권익을 보호하기 위해 적법하고 적정하게 취급할 것입니다.</li>
          <li>또한, <효도르>는 관련 법령에서 규정한 바에 따라 보유하고 있는 개인정보에 대한 열람, 정정·삭제, 처리정지 요구 등 이용자의 권익을 존중하며, 이용자는 이러한 법령상 권익의 침해 등에 대하여 행정심판법에서 정하는 바에 따라 행정심판을 청구할 수 있습니다.</li>
        <li><효도르>는 개인정보보호법 제 30조에 따라 정보주체의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보 처리방침을 수립 · 공개하고 있습니다.</li>
</ul></b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="info">개인정보의 처리 목적</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text style="font-size:15px;">
            <ul>
              <li>효도르는 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</li>
              <li> 가. 서비스 제공</li>
              <li> 통계제공 건강검진 알람 등 서비스 제공에 관련한 목적으로 개인정보를 처리합니다</li>
              </ul>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-3 variant="info">개인정보의 3자 제공</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text style="font-size:15px;" ><ul>
            <li>
              <효도르>는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </li>
            <li>
              <효도르>는 >은 민원 신청인이 공공기관에 대하여 신청한 개인정보 열람, 정정·삭제, 처리정지민원을 처리하기 위하여 민원 신청인의 개인정보를 개인정보파일 보유기관에게 이송(제공)하고 있으며, <민원사무 처리에 관한 법률>에서 정하는 기간 동안 해당 기관에서 보유 및 이용합니다.
              </li>
            </ul>
          </b-card-text>
        </b-card-body>
      </b-collapse>
      
    </b-card>
  </div><div class="form-check">
    <input type="checkbox">
    <label >동의합니다</label>
    <input type="checkbox">
    <label >동의하지 않습니다</label>
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
.fleft{
  float: right;
}
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
