<template>
  <div class="h-100">
    <h-nav current-page="adminconsole"></h-nav>

    <b-container class="mt-3">
      <b-row>
        <h2>Admin Console</h2>
      </b-row>
      <b-row class="mt-3">
        <b-tabs class="w-100">
          <b-tab title="홈">
            <b-container>
              <b-row>
                <b-col></b-col>
              </b-row>
              <b-row></b-row>
            </b-container>
          </b-tab>
          <b-tab title="커뮤니티 관리"></b-tab>
          <b-tab title="유저 관리" @click="$wait.start('usermanagetable');updateUserList()">
            <v-wait for="usermanagetable">
              <template slot="waiting">
                <div class="d-flex justify-content-center">
                  <Spinner name="fading-circle" color="black" :noFadeIn="true" height="25" />
                </div>
              </template>
              <div class="mt-2">
                <div class="d-flex justify-content-between">
                  <b-form-group>
                    <b-input-group size="sm">
                      <b-form-input
                        v-model="userfilter"
                        type="search"
                        id="filterInput"
                        placeholder="필터.."
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <p>
                    <span v-if="userselected.length > 0">{{ userselected[0].nickname }} 선택됨</span>
                  </p>
                  <p>
                    <b-button size="sm" v-b-modal="'user-delete-modal'" variant="danger">선택한 유저 탈퇴</b-button>
                  </p>
                </div>
                <b-table
                  ref="usertable"
                  :items="userlist"
                  :fields="userfields"
                  :filter="userfilter"
                  sticky-header
                  select-mode="single"
                  selectable
                  @row-selected="onUserSelected"
                ></b-table>
              </div>
            </v-wait>
          </b-tab>
        </b-tabs>
      </b-row>
    </b-container>
    <b-modal
      id="user-delete-modal"
      v-if="userselected.length > 0"
      title="다음 유저가 탈퇴됩니다"
      @ok="onUserDeleteOk"
    >
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" variant="secondary" @click="cancel()">취소</b-button>
        <b-button size="sm" variant="danger" @click="ok()">탈퇴</b-button>
      </template>
      <div>
        아이디: {{ userselected[0].username }}
        <br />
        닉네임: {{ userselected[0].nickname }}
        <br />
        이메일: {{ userselected[0].email }}
      </div>
    </b-modal>
    <b-modal id="info-modal" :title="infoModal.title" ok-only>{{ infoModal.content }}</b-modal>
  </div>
</template>
<style scoped>
</style>
<script>
import NavBarVue from "../components/Navbar";
import * as session from "../utils/loginService.js";
import Spinner from "vue-spinkit";
export default {
  components: {
    "h-nav": NavBarVue,
    Spinner: Spinner
  },
  data() {
    return {
      userfields: [
        { key: "username", label: "아이디", sortable: true },
        { key: "nickname", label: "닉네임", sortable: true },
        { key: "email", label: "이메일", sortable: true },

        { key: "actions", label: "" }
      ],
      userlist: [],
      userselected: [],
      userfilter: null,

      infoModal: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    updateUserList() {
      session
        .get(session.apiurl + "admin/user")
        .then(response => {
          this.userlist = response.data.users;
          this.$wait.end("usermanagetable");
        })
        .catch(error => {
          this.userlist = [];
          this.$wait.end("usermanagetable");
        });
    },
    deleteUserComfirm(item, index, button) {
      console.log(item);
      console.log(index);
    },
    onUserSelected(items) {
      this.userselected = items;
    },
    onUserDeleteOk(e) {
      let user = this.userselected[0];
      session
        .del(session.apiurl + "admin/user/" + user.username)
        .then(response => {
          this.showInfo(
            "회원 탈퇴 완료",
            user.nickname +
              "(" +
              user.username +
              ")" +
              " 유저가 탈퇴처리 되었습니다."
          );
          this.updateUserList();
        })
        .catch(error => {
          if (error.response && error.response.status == 401) {
            this.showInfo("회원 탈퇴 실패", "이미 탈퇴된 유저입니다.");
          } else {
            this.showInfo("회원 탈퇴 실패", "탈퇴 처리에 실패했습니다.");
          }
        });
    },

    showInfo(title, msg) {
      this.infoModal.title = title;
      this.infoModal.content = msg;
      this.$bvModal.show("info-modal");
    }
  },
  mounted: function() {
    //this.updateUserList();
  }
};
</script>