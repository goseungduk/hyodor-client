<template>
  <div>
    <!-- 여기는 width 조절을 잘 맞춰야합니다 -->
    <!--  화이팅 -->
    <h-nav current-page="mypage"></h-nav>
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
                <b-col>{{emailnow}}</b-col>
              </b-row>
            </b-container>
          </b-tab>
          <b-tab title="개인정보 변경">
            <b-row class="mt-3">
              <b-col md="4" class="colboard">현재 닉네임</b-col>
              <b-col cols="7">{{user_nickname}}</b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="4" class="colboard">바꿀 닉네임</b-col>
              <b-col cols="7">
                <b-form-input v-model="nickwill" placeholder="바꿀 닉네임을 입력해주세요"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="4" class="colboard">현재 이메일</b-col>
              <b-col cols="7">{{this.emailnow}}</b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="4" class="colboard">바꿀 이메일</b-col>
              <b-col cols="7">
                <b-form-input v-model="emailwill" placeholder="바꿀 이메일을 입력해주세요"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="4" class="colboard">비밀번호 확인</b-col>
              <b-col cols="7">
                <b-form-input
                  v-model="pwnow"
                  placeholder="비밀번호를 입력하세요."
                  :disabled="$wait.is('changeloading')"
                ></b-form-input>
              </b-col>
            </b-row>
            <!-- 개인정보 변경함수 -->
            <b-button variant="danger" @click="changeInfo()" :disabled="$wait.is('changeloading')">
              <v-wait for="changeloading">
                <template slot="waiting">
                  <div class="d-flex justify-content-center">
                    <b-spinner label="Loading..." small></b-spinner>
                  </div>
                </template>
                정보변경
              </v-wait>
            </b-button>
          </b-tab>
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
          <b-tab title="부모님정보 추가 및 변경">
            <b-button id="show-btn" @click="showModal()">+</b-button>
          </b-tab>
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
    </b-container>
    <loading v-wait:visible="'changeloading'"></loading>
    <loading v-wait:visible="'withdrawloading'"></loading>
    <b-modal id="infomodal" :title="infobox.title" ok>{{ infobox.content }}</b-modal>
    <b-modal ref="my-modal" id="bv-modal-example">
      <template slot="modal-title">
        <span style="font-size:30px;font-weight:bold;">부모님정보 추가</span>
      </template>
      <div class="d-block text-left">
        <h5 style="font-weight:bold">성함</h5>
        <b-form-input v-model="parentName" placeholder="부모님 성함을 입력해주세요"></b-form-input>
        <h5 style="font-weight:bold">성별</h5>
        <b-form-select v-model="parentSex" class="mb-3">
          <option :value="null">부모님 성별을 선택해주세요</option>
          <option value="남">남</option>
          <option value="여">여</option>
        </b-form-select>
        <h5 style="font-weight:bold">관계</h5>
        <b-form-input placeholder="관계를 입력해주세요" v-model="parentRelation" list="my-list-id"></b-form-input>

        <datalist id="my-list-id">
          <option></option>
          <option v-for="size in sizes">{{ size }}</option>
          <!-- 오류 신경쓰지마세요 -->
        </datalist>
        <h5 style="font-weight:bold">생년월일</h5>
        <h6>a</h6>
      </div>
    </b-modal>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import * as session from "../utils/loginService";
import Loading from "../components/Loading.vue";
import draggable from "vuedraggable";
export default {
  data: function() {
    return {
      //***************************************** */
      enabled: true,
      list: [
        { name: "John", id: 0 },
        { name: "Joao", id: 1 },
        { name: "Jean", id: 2 }
      ],
      dragging: false,
      //**************************************** */
      parentSex: null,
      parentRelation:'',
      sizes: ['부', '모', '조부', '조모'],
      withdraw: {
        password: ""
      },
      infobox: {
        title: "",
        content: ""
      },

      user_id: "",
      user_nickname: "",
      emailnow: "",
      pwnow: "",
      pwwill1: "",
      pwwill2: "",
      nickwill: "",
      emailwill: "",
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
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  components: {
    "h-nav": NavbarVue,
    loading: Loading,
    draggable
  },
  mounted: function() {
    console.log(session.getRefreshToken());
    if (session.getRefreshToken() == null) {
      alert("로그인 해주세요!");
      location.href = "/login";
    } else {
      this.user_id = session.getUsername();
      this.user_nickname = session.getNickname();
      session.get(session.apiurl + "login").then(response => {
        this.emailnow = response.data.email;
      });
    }
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
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
    },
    changeInfo() {
      this.$wait.start("changeloading");
      this.infobox.title = "기능구현안됨";
      this.infobox.content = "기능구현하세요";
      this.$bvModal.show("infomodal");
      this.$wait.end("changeloading");
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