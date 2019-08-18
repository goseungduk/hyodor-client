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
      <b-nav pills>
        <b-nav-item @click="change(1)" :active='isSelected(1)'>자유게시판</b-nav-item>
        <b-nav-item @click="change(2)" :active='isSelected(2)'>선물 추천</b-nav-item>
        <b-nav-item @click="change(3)" :active='isSelected(3)'>고민 상담</b-nav-item>
        <b-nav-item @click="change(4)" :active='isSelected(4)'>편지 쓰기</b-nav-item>
        <b-nav-item @click="change(5)" :active='isSelected(5)'>경조사 장소 알려주세요!</b-nav-item>
      </b-nav>
    </div>
    <b-container>
      <!-- <FreeBoard v-bind:no="no"></FreeBoard> -->
      <component :is="currentView" :no="no"></component>
    </b-container>
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
    "h-nav": NavbarVue,
    FreeBoard, WriteBoard
  },
  data: function() {
    return {
      selectedBoardId: 1
      //no: '',
      // currentView: ""
    };
  },
  methods: {
    change(number) {
      // no번호 체인지 해주는 메소드가 될것임.
      this.$store.dispatch(Constant.UPDATE_BOARD,{currentView:"FreeBoard",num:number});
      this.selectedBoardId = number;
      // this.no = number;
      // this.currentView = "FreeBoard";
      console.log(this.no);
    },
    isSelected(boardId) {
      if (boardId == this.selectedBoardId) {
        return true;
      }
      return false;
    }
  },
  computed:mapState(['currentView','no'])
};
</script>
<style scoped>
.header {
  margin-top: 0.1em;
}
</style>