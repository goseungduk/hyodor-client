<template>
  <div>
    <h-nav current-page="boardlist"></h-nav>

    <div>
      <!-- <b-nav> -->
      <b-nav class="menubar_set mt-3" fill>
        <b-nav-item class="menu_set mb-2" :to="{name:'free',params:{no:1,pageNo:1},query: { p: '1' }}" :active='isSelected(1)' :class="[isSelected(1) ? 'm_active':'non_active']" >자유게시판</b-nav-item>
        <b-nav-item class="menu_set mb-2" :to="{name:'free',params:{no:2,pageNo:1},query: { p: '1' }}" :active='isSelected(2)' :class="[isSelected(2) ? 'm_active':'non_active']" >선물추천</b-nav-item>
        <b-nav-item class="menu_set mb-2" :to="{name:'free',params:{no:3,pageNo:1},query: { p: '1' }}" :active='isSelected(3)' :class="[isSelected(3) ? 'm_active':'non_active']">고민상담</b-nav-item>
        <b-nav-item class="menu_set mb-2" :to="{name:'free',params:{no:4,pageNo:1},query: { p: '1' }}" :active='isSelected(4)' :class="[isSelected(4) ? 'm_active':'non_active']">편지쓰기</b-nav-item>
        <b-nav-item class="menu_set mb-2" :to="{name:'free',params:{no:5,pageNo:1},query: { p: '1' }}" :active='isSelected(5)' :class="[isSelected(5) ? 'm_active':'non_active']">경조사 장소 알려주세요!</b-nav-item>
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
.menubar_set{  
list-style-type:none; 
padding-right: 20px;
padding-left: 15px;
margin-left: auto;
margin-right: auto;


}
.menu_set{float: left;}
.menu_set a{
  display: block; color: #5153c2; 
  text-align:center;
 text-decoration:none;
 
 }
.menu_set a:hover{ 
color:#5f90df; 
font-weight:bold;

}
.m_active{ 
color:#5153c2; 
font-weight:bold;

border-bottom: 3px solid #5153c2;
}
.non_active{
  display: block; color: navy; text-align:center;
 text-decoration:none;
}
@media (min-width: 768px) {
  .menubar_set {
    width: 760px;
    
  }
  .menu_set a{
    font-size: 15px;
  }
  
}

@media (min-width: 992px) {
  .menubar_set {
    width: 850px;
    
  }
  .menu_set a{
    font-size: 15px;
  }
}

@media (min-width: 1200px) {
  .menubar_set {
    width: 900px;
    
  }
  .menu_set a{
    font-size: 18px;
  }
}
</style>