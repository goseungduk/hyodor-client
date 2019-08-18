<template>
  <div>
    <h-nav current-page="boardlist"></h-nav>
    <!-- <b-nav pills>
      <ul class="menubar_set mt-3"> -->
        <!-- <b-nav-item class="menu_set mb-2" @click="change(1)" :class="[mnactive('free') ? 'active':'non_active']">자유게시판</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(2)" :class="[mnactive('gift') ? 'active':'non_active']">선물 추천</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(3)" :class="[mnactive('gomin') ? 'active':'non_active']">고민 상담</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(4)" :class="[mnactive('letter') ? 'active':'non_active']">편지 쓰기</b-nav-item>
        <b-nav-item class="menu_set mb-2" @click="change(5)" :class="[mnactive('partyPlace') ? 'active':'non_active']">경조사 장소 알려주세요!</b-nav-item> -->
<!-- 뭐가 바뀔지 몰라서 추가만 해놨어요--->
      <!-- </ul>
    </b-nav> -->
    <div class="header">
      <!-- <b-nav> -->
      <b-nav pills>
        <b-nav-item :to="{name:'free',params:{no:1}}" :active='isSelected(1)'>자유게시판</b-nav-item>
        <b-nav-item :to="{name:'free',params:{no:2}}" :active='isSelected(2)'>선물추천</b-nav-item>
        <b-nav-item :to="{name:'free',params:{no:3}}" :active='isSelected(3)'>고민상담</b-nav-item>
        <b-nav-item :to="{name:'free',params:{no:4}}" :active='isSelected(4)'>편지쓰기</b-nav-item>
        <b-nav-item :to="{name:'free',params:{no:5}}" :active='isSelected(5)'>경조사 장소 알려주세요!</b-nav-item>
        <!-- <b-nav-item @click="change(1)" :active='isSelected(1)'>자유게시판</b-nav-item>
        <b-nav-item @click="change(2)" :active='isSelected(2)'>선물 추천</b-nav-item>
        <b-nav-item @click="change(3)" :active='isSelected(3)'>고민 상담</b-nav-item>
        <b-nav-item @click="change(4)" :active='isSelected(4)'>편지 쓰기</b-nav-item>
        <b-nav-item @click="change(5)" :active='isSelected(5)'>경조사 장소 알려주세요!</b-nav-item> -->
      </b-nav>
    </div>
    <b-container>
      <!-- <FreeBoard v-bind:no="no"></FreeBoard> -->
      <!-- <component :is="currentView" :no="no" :con_no="con_no"></component> -->
      <router-view></router-view>
    </b-container>

  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import Constant from "../Constant";
import FreeBoard from "./FreeBoard";
import WriteBoard from "./WriteBoard";
import ViewBoard from "./ViewBoard";
export default {
  name: "boardlist",
  components: {
    "h-nav": NavbarVue,
    FreeBoard, WriteBoard,
    ViewBoard
  },
  data: function() {
    return {
      selectedBoardId: 1
      //no: '',
      // currentView: ""
    };
  },
  methods: {
    isSelected(boardId) {
      //부모가 자식의 인자를 $route 객체의 params로 다룰 수 있다.
      if (boardId == this.$route.params.no) {
        return true;
      }
      return false;
    }
  },
};
</script>
<style scoped>
.header {
  margin-top: 0.1em;
}
nav li:hover,
 nav li.router-link-active,
 nav li.router-link-exact-active {
   background-color: indianred;
   cursor: pointer;
 }
</style>