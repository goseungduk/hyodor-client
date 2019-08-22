<template>
  <div>
    <v-wait for="listloading">
      <template slot="waiting">
        <div class="text-center mt-5">
          <b-spinner variant="dark" label="Spinning"></b-spinner>
        </div>
      </template>
    </v-wait>
    <div class="con" v-wait:hidden="'listloading'">
      <div class="mt-4"></div>
      <article v-for="i in items" :key="i.id">
        <router-link :to="{name:'view',params:{no:no,con_no:i.id}}">
          <!-- 게시물 각각은 stacked view -->
          <!-- 제목 - 내용 - 닉네임 순으로 쌓여진 형태 -->
          <b-container class="hov">
            <b-row>
              <b-col class="ml-md-auto p-2">
                <h4 class="h4_hov">{{i.title}}</h4>
                <h6 style="color:grey;">{{i.content}}</h6>
                <p v-if="i.writer==null" style="color:black;">(탈퇴한유저)</p>
                <p v-else style="color:black;">{{i.writer.nickname}}</p>
                <span>
                    <img src="../assets/good_non.png" class="mb-2"  width="18px" height="18px" style="margin-right:5px;"><span style="color:#DA0202;">{{i.vote_up}}</span>
                    <img src="../assets/bad_non.png" class="mb-2"  width="18px" height="18px" style="margin-right:5px;">
                    <span style="color:#00A5FF;">{{i.vote_down}}</span>
                </span>
              </b-col>
            </b-row>
          </b-container>
        </router-link>
        <router-view></router-view>
      </article>
    </div>

    <b-container class="con" v-wait:hidden="'listloading'">
      <b-row class="mt-2">
        <b-col>
          <span class="right-box">
            <b-button block class="button" @click="change()">글쓰기</b-button>
          </span>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col md="auto">
          <div>
            <b-pagination-nav
              :link-gen="pagegen"
              @input="updateList()"
              :number-of-pages="pageCount"
              use-router
            ></b-pagination-nav>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Constant from "../Constant";
import axios from "axios";
import mapState from "vuex";
import * as session from "../utils/loginService.js";
import x2j from "xml2js";
export default {
  name: "freeboard",
  props: {
    no: "", // 게시판 번호 받아오는 props
    pageSize: {
      // 한 페이지당 보여줄 게시물 개수
      type: Number,
      required: false,
      default: 5 // 디폴트 값은 5개
    }
  },
  data: function() {
    return {
      items: [], // 게시판 post 모아두는 변수
      pageNum: 0, // 기본 pageNumber
      currentPage: 1,
      totalCount: 0
      //************************************************************** */
      // 전체 post 개수 , totalcount가 아닌 count 값(현재 삭제되지않고 유지되고 있는 게시물)을 가져옴
    };
  },
  methods: {
    change() {
      this.$router.push({
        name: "write",
        params: { no: this.no, tit: "", con: "" }
      });
    },
    updateList() {
      this.$wait.start("listloading");
      this.currentPage = this.$route.query.p;
      session
        .get(session.apiurl + "board/" + this.no, {
          page: this.currentPage,
          pagesize: this.pageSize
        })
        .then(response => {
          this.items = response.data.posts;
          this.length = response.data.count;
          this.totalCount = response.data.totalcount;
          this.$wait.end("listloading");
        })
        .catch(e => {
        //   alert("서버오류!" + e);
          location.href = "/login";
          this.items = [];
          this.$wait.end("listloading");
        });
    },
    pagegen(pagenum) {
      return {
        name: "free",
        params: { no: this.no },
        query: { p: pagenum + "" }
      };
    }
  },
  computed: {
    pageCount() {
      // 게시물 개수는 변화가 있을 때마다 실시간으로 compute 해준다
      let listLeng = this.totalCount;
      let listSize = this.pageSize;
      let page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;

      /*
            아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
            이런식으로 if 문 없이 고칠 수도 있다!
            */
      return Math.max(page, 1);
    }
  },
  mounted: function() {
    //로딩 표시 띄워줘야함.
    var curpage = parseInt(this.$route.query.p);
    if (!curpage) {
      curpage = 1;
      this.$router.replace({
        name: "free",
        params: { no: this.no },
        query: { p: "1" }
      });
    }
    this.currentPage = curpage;
    this.updateList();
  },
  watch: {
    // 게시판 번호의 변화에 따라 즉각적으로 게시물 업뎃 하기위한 watch
    no: function() {
      // 게시판이 바뀔때마다 첫페이지로 바꿔주자
      this.currentPage = 1;
      this.updateList();
    }
  }
};
</script>
<style scoped>
.addnew {
  margin: 1px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 14px 0px 0px 0px;
  text-align: left;
}

#example {
  padding-right: 15px;
  padding-left: 15px;
  max-width: 820px;
  min-width: 820px;
  padding: 10px;

  font: 13px "verdana";
}

#example .long {
  width: 100%;
}

#example .short {
  width: 50%;
}

#example input,
textarea,
select {
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0px;
  outline: none;
}

#list {
  width: 1000px;
  font: 13px "verdana";
}

#list thead tr {
  color: black;
  background-color: gray;
}

#list th:nth-child(5n + 1),
#list td:nth-child(5n + 1) {
  width: 50px;
}

/* 글번호 */

#list th:nth-child(5n + 2),
#list td:nth-child(5n + 2) {
  width: 300px;
}

/* 제목 */

#list th:nth-child(5n + 3),
#list td:nth-child(5n + 3) {
  width: 50px;
}

/* 추천수 */

#list th:nth-child(5n + 4),
#list td:nth-child(5n + 4) {
  width: 60px;
}

#list th:nth-child(5n),
#list td:nth-child(5n) {
  width: 150px;
}

#list th {
  padding: 10px 5px 10px 5px;
}

#list td,
#list th {
  text-align: center;
  vertical-align: middle;
}

img.thumbnail {
  width: 48px;
  height: 48px;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.right-box {
  background: white;
  float: right;
}
.hov {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}
.hov:hover {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
}
.button {
  border: 2px solid #58b4fb;
  color: #2b75ad;
  background-color: rgba(0, 0, 0, 0);
  font-weight: bold;
}
.button:hover {
  color: white;
  background-color: #58b4fb;
}
.page {
  text-decoration: none;
  border: 2px solid #3764cc;
  color: #3764cc;
  background-color: rgba(0, 0, 0, 0);
  font-weight: bold;
}
.page:hover {
  color: white;
  background-color: #3764cc;
}
.pagenum {
  color: #3764cc;
  font-weight: bold;
}
.con {
  padding-right: 20px;
  padding-left: 15px;
  margin-left: auto;
  margin-right: auto;
}
.h4_hov{
    color:black;
}
.h4_hov:hover{
    color:#5153c2;
}
@media (min-width: 768px) {
  .con {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .con {
    width: 850px;
  }
}

@media (min-width: 1200px) {
  .con {
    width: 900px;
  }
}
</style>
