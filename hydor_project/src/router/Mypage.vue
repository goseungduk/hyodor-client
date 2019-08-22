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
          <!-- <b-tab title="개인정보 변경">
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
             개인정보 변경함수 -->
            <!-- <b-button variant="danger" @click="changeInfo()" :disabled="$wait.is('changeloading')">
              <v-wait for="changeloading">
                <template slot="waiting">
                  <div class="d-flex justify-content-center">
                    <b-spinner label="Loading..." small></b-spinner>
                  </div>
                </template>
                정보변경
              </v-wait>
            </b-button>
          </b-tab> -->
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
            <span style="font-size:30px;font-weight:bold;">부모님정보 추가</span>
            <b-button id="show-btn" @click="show()">+</b-button>
            <div v-if="isShow==true" class="d-block text-left">
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
                <option v-for="size in sizes" :key="size">{{ size }}</option>
                <!-- 오류 신경쓰지마세요 -->
              </datalist>
              <h5 style="font-weight:bold">생년월일</h5>
              <VueCtkDateTimePicker v-model="date" />
              <b-button @click="submitParent()">전송</b-button>
            </div>
            <div>
              <p>아무그룹없음</p>
            <div v-for="(t,$index) in parentRes.parentList" :key="t.id">
              <b-card v-if="t.group_id==null"
                :title="t.name"
                :sub-title="t.relation"
                style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 10px;margin-bottom: 30px;"
              >
                <b-text>{{t.birthday}}</b-text>
                <b-button @click="ccuredit($index)">수정하기</b-button>
                <!-- 8888888888888888888888 -->
                <div v-if="curedit==$index" class="d-block text-left">
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
                    <option v-for="size in sizes" :key="size">{{ size }}</option>
                    <!-- 오류 신경쓰지마세요 -->
                  </datalist>
                  <h5 style="font-weight:bold">생년월일</h5>
                  <VueCtkDateTimePicker v-model="date" />
                  <b-button @click="updateParent(t.id)">수정</b-button>
                </div>
                <!-- 8888888888888888888888 -->
              </b-card>
            </div>
            </div>
            <div v-for="k in parentRes.parentGroup" :key="k.id">
            <p>그룹이름 {{k.name}}</p>
            <div v-for="(i, $index) in parentRes.parentList" :key="$index">
              <b-card v-if="i.group_id==k.id"
                :title="i.name"
                :sub-title="i.relation"
                style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);padding: 10px;margin-bottom: 30px;"
              >
                <b-text>{{i.birthday}}</b-text>
                <b-button @click="ccuredit($index)">수정하기</b-button>
                <!-- 8888888888888888888888 -->
                <div v-if="curedit==$index" class="d-block text-left">
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
                    <option v-for="size in sizes" :key="size">{{ size }}</option>
                    <!-- 오류 신경쓰지마세요 -->
                  </datalist>
                  <h5 style="font-weight:bold">생년월일</h5>
                  <VueCtkDateTimePicker v-model="date" />
                  <b-button @click="updateParent(i.id)">수정</b-button>
                </div>
                <!-- 8888888888888888888888 -->
              </b-card>
            </div>
            </div>
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
    <b-modal id="infomodal" :title="infobox.title" ok>{{ infobox.content }}
    </b-modal>
    <b-modal ref="my-modal" id="bv-modal-example"></b-modal>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import * as session from "../utils/loginService";
import Loading from "../components/Loading.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
export default {
  data: function() {
    return {
      parentRes:{
        parentGroup:[],
        parentList:[]
        // 맨처음 바깥에 parentGroup에 따라 v-for
        // 그리고 그 v-for 구문안에서 parentList를 v-if 로 걸러내서 보여줌 parentList에는 groupid가 있다
        // v-for="i in parentGroup"
      },
      curedit: -1,
      parentList: [],
      isShow: false,
      date: new Date([2000, 8, 23]),
      parentName: "",
      parentSex: null,
      parentRelation: "",
      sizes: ["부", "모", "조부", "조모"],
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
  components: {
    "h-nav": NavbarVue,
    loading: Loading,
    VueCtkDateTimePicker
  },
  mounted: function() {
    console.log(session.getRefreshToken());
    if (session.getRefreshToken() == null) {
      // alert("로그인 해주세요!");
      location.href = "/login";
    } else {
      this.user_id = session.getUsername();
      this.user_nickname = session.getNickname();
      session.get(session.apiurl + "login").then(response => {
        this.emailnow = response.data.email;
        
      });
      session.get(session.apiurl + "parent").then(response => {
          this.parentRes.parentList = response.data.parents;
          console.log(this.parentRes.parentList);
        });
      session.get(session.apiurl+"parentgroup")
        .then((response)=>{
          this.parentRes.parentGroup=response.data.groups;
          console.log(this.parentRes.parentGroup);
        })
    }
  },
  methods: {
    ccuredit(num){
      if(this.curedit!=num)
        this.curedit=num;
      else
        this.curedit=-1;
    },
    updateParent(num){
      session.patch(session.apiurl+"parent/"+num,{
          name: this.parentName,
          relation: this.parentRelation,
          gender: this.parentSex,
          birthday: this.date.slice(0, 10)
        })
      .then((response)=>{
        this.curedit=-1;
        session.get(session.apiurl + "parent").then(response => {
            this.parentList = response.data.parents;
            console.log(this.parentList);
          });
      })
    },
    submitParent() {
      console.log(this.date);
      // console.log(this.date.toISOString());
      session
        .post(session.apiurl + "parent", {
          name: this.parentName,
          relation: this.parentRelation,
          gender: this.parentSex,
          birthday: this.date.slice(0, 10)
        })
        .then(response => {
          console.log(response);
          session.get(session.apiurl + "parent").then(response => {
            this.parentList = response.data.parents;
            console.log(this.parentList);
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    show() {
      if (this.isShow == false) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    log(val) {
      this.date = val;
      console.log(val);
    },
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