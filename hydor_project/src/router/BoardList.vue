<template>
  <div>
    <b-nav current-page="boardlist"></b-nav>
    <b-nav pills>
      <ul class="menubar_set mt-3">
        <b-nav-item class="menu_set mb-2" @click="change(1)" :class="[mnactive('free') ? 'active':'non_active']">자유게시판</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(2)" :class="[mnactive('gift') ? 'active':'non_active']">선물 추천</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(3)" :class="[mnactive('gomin') ? 'active':'non_active']">고민 상담</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(4)" :class="[mnactive('letter') ? 'active':'non_active']">편지 쓰기</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(5)" :class="[mnactive('partyPlace') ? 'active':'non_active']">경조사 장소 알려주세요!</b-nav-item>
<!-- 뭐가 바뀔지 몰라서 추가만 해놨어요--->
      </ul>
    </b-nav>
    <div id="app" ref="app"></div>
    <div class="header">
      <nav>
        <ul>
          <li>
            <b-button squared variant="outline-danger" @click="change(1)">자유게시판</b-button>
          </li>
          <li>
            <b-button squared variant="outline-danger" @click="change(4)">선물 추천</b-button>
          </li>
          <li>
            <b-button squared variant="outline-danger" @click="change(3)">고민 상담</b-button>
          </li>
          <li>
            <b-button squared variant="outline-danger" @click="change(4)">편지 쓰기</b-button>
          </li>
          <li>
            <b-button squared variant="outline-danger" @click="change(5)">경조사 장소 알려주세요!</b-button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container">
      <!-- <FreeBoard v-bind:no="no"></FreeBoard> -->
      <component :is="currentView" :no="no"></component>
    </div>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import Constant from "../Constant";
import FreeBoard from "./FreeBoard";
import WriteBoard from "./WriteBoard";
import { mapState } from "vuex";
export default {
  name: "boardlist",
  components: {
    "b-nav": NavbarVue,
    FreeBoard, WriteBoard
  },
  data: function() {
    return {
      //no: '',
      // currentView: ""
    };
  },
  methods: {
    change(number) {
      // no번호 체인지 해주는 메소드가 될것임.
      this.$store.dispatch(Constant.UPDATE_BOARD,{currentView:"FreeBoard",num:number});
      // this.no = number;
      // this.currentView = "FreeBoard";
      console.log(this.no);
    }
  },
  computed:mapState(['currentView','no'])
};
</script>
<style scoped>
.header {
  background-color: aqua;
  padding: 10px 0px 0px 0px;
}
.headerText {
  padding: 0px 20px 0px 20px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: purple;
}
li {
  float: left;
}
li a {
  display: block;
  color: yellow;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: aqua;
  color: black;
}
.menubar_set{list-style-type:none; border-bottom:thin solid black; margin: 0 auto;
}
.menu_set{float:left;}
.menu_set a{display: block; color: navy; text-align:center;
 text-decoration:none;}
.menu_set a:hover{ background-color: #bbdefb; color:navy; font-weight:bold;}
.active{ background-color: #bbdefb; color:navy; font-weight:bold;
padding:4px 8px;
}
.non_active{
  display: block; color: navy; text-align:center;
 text-decoration:none;
}
</style>