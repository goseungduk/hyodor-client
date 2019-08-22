<template>
  <div>
    <!-- 여기는 width 조절을 잘 맞춰야합니다 -->
    <!--  화이팅 -->
    <h-nav current-page="mypage"></h-nav>-
    <b-container class="mt-3">
      <b-row>
        <h2>My Page</h2>
      </b-row>
      <b-row class="mt-4">
        <b-tabs vertical class="mytabs w-100" pills>
          <b-tab title="홈">
            <b-container>
              <b-row class="mt-3">
                <b-col md="2" class="colboard">아이디</b-col>
                <b-col>{{user_id}}</b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="2" class="colboard">닉네임</b-col>
                <b-col>{{user_nickname}}</b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="2" class="colboard">이메일</b-col>
                <b-col>(이메일 return해줘요)</b-col>
              </b-row>
            </b-container>
          </b-tab>
          <b-tab title="개인정보 변경"></b-tab>
          <b-tab title="비밀번호 변경">
            <b-row class="mt-3">
              <b-col md="4" class="colboard">현재비밀번호</b-col>
              <b-col cols="7">
                <b-form-input v-model="pwnow" placeholder="현재비밀번호를 입력해주세요"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="4" class="colboard">새 비밀번호</b-col>
              <b-col cols="7">
                <b-form-input v-model="pwwill1" placeholder="새 비밀번호를 입력해주세요"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="4" class="colboard">
                <div>새 비밀번호</div>
                <div>다시입력</div>
              </b-col>
              <b-col cols="7">
                <b-form-input v-model="pwwill2" placeholder="새 비밀번호를 다시 입력해주세요"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col>
                <button class="change mt-2 ml-5">비밀번호 변경</button>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="부모님정보 추가 및 변경"></b-tab>
          <b-tab title="회원탈퇴">
            <b-row>
              <b-col>
                <p>회원탈퇴 시 가입시의 정보는 모두 삭제됩니다.</p>
                <p>작성한 게시글과 덧글등은 삭제되지 않습니다.</p>

                <div>
                  <b-input-group>
                    <b-form-input
                      v-model="withdraw.password"
                      placeholder="비밀번호를 입력하세요."
                      :disabled="$wait.is('withdrawloading')"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        variant="danger"
                        @click="withdrawUser()"
                        :disabled="$wait.is('withdrawloading')"
                      >
                        <v-wait for="withdrawloading">
                          <template slot="waiting">
                            <div class="d-flex justify-content-center">
                              <b-spinner label="Loading..." small></b-spinner>
                            </div>
                          </template>
                          회원탈퇴
                        </v-wait>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-row>
    </b-container>-
    
    <loading v-wait:visible="'withdrawloading'"></loading>
    <b-modal id="infomodal" :title="infobox.title" ok>{{ infobox.content }}</b-modal>
   
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import * as session from "../utils/loginService";
import Loading from "../components/Loading.vue";
export default {
  data: function() {
    return {
      withdraw: {
        password: ""
      },
      infobox: {
          title:"",
          content:""
      },

      user_id: "",
      user_nickname: "",
      pwnow: "",
      pwwill1: "",
      pwwill2: "",
      currentTab: 0,
      tabs: [
        "홈",
        "개인정보 변경",
        "비밀번호 변경",
        "부모님정보 추가 및 변경",
        "회원탈퇴"
      ]
    };
  },
  components: {
    "h-nav": NavbarVue,
    loading: Loading
  },
  mounted: function() {
    console.log(session.getRefreshToken());
    if (session.getRefreshToken() == null) {
      alert("로그인 해주세요!");
      location.href = "/login";
    } else {
      this.user_id = session.getUsername();
      this.user_nickname = session.getNickname();
    }
  },
  methods: {
    withdrawUser() {
      this.$wait.start("withdrawloading");
      session
        .del(session.apiurl + "login", { password: this.withdraw.password })
        .then(response => {
          alert("회원탈퇴 되었습니다.");
          this.$wait.end("withdrawloading");
        })
        .catch(error => {
          if (error.response) {
              this.infobox.title = "회원 탈퇴 실패";
              this.infobox.content = "비밀번호가 일치하지 않습니다.";
              this.$bvModal.show("infomodal");
          }
          this.$wait.end("withdrawloading");
        });
    }
  }
};
</script>
<style scoped>
.nav-link.active {
  background-color: black;
}

/* .menubtn {
  padding: 10px 20px 10px 10px;
  background-color: #fcfcfc;
  border: none;
  color: black;
}
.menubtn:hover {
  font-weight: bold;
  color: #2b75ad;
  background-color: #edf6f7;
}
.menubtn.menubtn.active.focus,
.menubtn.menubtn.active:focus,
.menubtn.menubtn.active:hover,
.menubtn.menubtn:active.focus,
.menubtn.menubtn:active:focus,
.menubtn.menubtn:active:hover .menubtn.menubtn.focus,
.menubtn.menubtn:focus,
.menubtn.menubtn.active,
.menubtn.menubtn:active {
  font-weight: bold;
  color: #2b75ad;
  background-color: #edf6f7;
}
.change {
  border: 1.4px solid #58b4fb;
  color: #2b75ad;
  background-color: rgba(0, 0, 0, 0);
  font-weight: bold;
  border-radius: 4px;
}
.change:hover {
  color: white;
  background-color: #58b4fb;
}
.colboard {
  font-weight: bold;
  color: gray;
}
.delete {
  border: 1px solid red;
  color: red;
  background-color: rgba(0, 0, 0, 0);
  float: right;
  border-radius: 4px;
  padding: 3px 5px 3px 5px;
}
.delete:hover {
  background-color: #da0202;
  border: 1px solid #da0202;
  color: white;
} */
</style>