<template>
  <div class="h-100">
    <h-nav current-page="adminconsole"></h-nav>

    <b-container class="mt-3">
      <b-row>
        <h2>Admin Console</h2>
      </b-row>
      <b-row class="mt-3">
        <b-tabs class="w-100">
          <b-tab title="커뮤니티 관리" @click="updateBoardList()">
            <div class="mt-2">
              <div class="d-flex justify-content-between">
                <b-form-group>
                  <b-input-group size="sm">
                    <b-form-select
                      v-model="board.filterIncludedFields"
                      :options="board.filterOptions"
                      v-wait:disabled="'*'"
                    ></b-form-select>

                    <b-form-input
                      v-model="board.filter"
                      type="search"
                      id="filterInput"
                      v-wait:disabled="'*'"
                      placeholder="필터.."
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
                <p>
                  <span v-if="board.selected.length > 0">{{ board.selected.length }}개 선택됨</span>
                </p>
                <p>
                  <b-button size="sm" v-b-modal="'post-delete-modal'" v-wait:disabled="'*'" variant="danger">삭제</b-button>
                </p>
              </div>
              <v-wait for="boardmanagetable">
                <template slot="waiting">
                  <div class="d-flex justify-content-center">
                    <Spinner name="fading-circle" color="black" :noFadeIn="true" height="25" />
                  </div>
                </template>
                <b-table
                  ref="boardtable"
                  :items="board.list"
                  :fields="board.fields"
                  :filter="board.filter"
                  :filterIncludedFields="board.filterIncludedFields"
                  sticky-header
                  select-mode="multi"
                  selectable
                  @row-selected="onBoardSelected"
                ></b-table>
              </v-wait>
            </div>
          </b-tab>
          <b-tab title="유저 관리" @click="updateUserList()">
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
    <b-modal
      id="post-delete-modal"
      v-if="board.selected.length > 0"
      title="다음 게시글들이 삭제됩니다"
      @ok="onBoardDeleteOk"
    >
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button size="sm" variant="secondary" @click="cancel()">취소</b-button>
        <b-button size="sm" variant="danger" @click="ok()">삭제</b-button>
      </template>
      <div>
        <b-table :items="board.selected"
                  :fields="board.fields">

        </b-table>
      </div>
    </b-modal>
    <b-modal id="info-modal" :title="infoModal.title" ok-only>{{ infoModal.content }}</b-modal>
    <b-modal id="loading-modal" :title="loadingModal.title" ok-only>
      <div class="d-flex justify-content-center">
                    <Spinner name="fading-circle" color="black" :noFadeIn="true" height="25" />
                  </div>
    </b-modal>
  </div>
</template>
<style scoped>
</style>
<script>
import NavBarVue from "../components/Navbar";
import * as session from "../utils/loginService.js";
import Spinner from "vue-spinkit";
import axios from 'axios';
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

      board: {
        list: [],
        fields: [
          { key: "id", label: "번호" },
          { key: "title", label: "제목" },
          {
            key: "owner",
            label: "작성자",
            formatter: (value, key, item) => {
              if (value == null) {
                return "(탈퇴한 유저)";
              } else {
                return value.nickname + " (" + value.username + ")";
              }
            },
            sortByFormatted: true,
            filterByFormatted: true
          },
          {
            key: "board",
            label: "게시판",
            formatter: (value, key, item) => {
              return value.name;
            }
          }
        ],
        filter: null,
        filterIncludedFields: [],
        filterOptions: [
          { value: [], text: "전체" },
          { value: ["id"], text: "번호" },
          { value: ["title"], text: "제목" },
          { value: ["owner"], text: "작성자" }
        ],
        selected: []
      },

      infoModal: {
        title: "",
        content: ""
      },

      loadingModal: {
        title: ""
      }
    };
  },
  methods: {
    updateUserList() {
      this.$wait.start("usermanagetable");
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


    updateBoardList() {
      this.$wait.start("boardmanagetable");
      session
        .get(session.apiurl + "admin/board")
        .then(response => {
          this.board.list = response.data.posts;
          this.$wait.end("boardmanagetable");
        })
        .catch(error => {
          this.board.list = [];
          this.$wait.end("boardmanagetable");
        });
    },
    onBoardSelected(items) {
      this.board.selected = items;
    },
    onBoardDeleteOk(e) {
      var lsts = []

      this.$wait.start("boardmanagetable");

      for (var i = 0; i < this.board.selected.length; i++) {
        lsts.push(session.del(session.apiurl + "board/post/" + this.board.selected[i].id));
      }

      Promise.all(lsts)
      .then(response => {
        this.showInfo("게시글 삭제 성공", lsts.length + "개 게시글을 삭제했습니다.");
        this.$wait.end("boardmanagetable");
        this.updateBoardList();
      })
      .catch(error => {
        this.showInfo("게시글 삭제 실패", "게시글 삭제에 실패했습니다.");
        this.$wait.end("boardmanagetable");
        this.updateBoardList();
      });
    },

    showInfo(title, msg) {
      this.infoModal.title = title;
      this.infoModal.content = msg;
      this.$bvModal.show("info-modal");
    }
  },
  mounted: function() {
    this.updateBoardList();
    //this.updateUserList();
  }
};
</script>