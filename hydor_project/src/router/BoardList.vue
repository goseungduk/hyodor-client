<template>
  <div>
    <b-nav current-page="boardlist"></b-nav>
    <div id="app" ref="app"></div>
    <div class="header">
      <nav>
        <ul>
          <li>
            <router-link v-bind:to="{name:'free',params:{no:1}}">자유게시판</router-link>
          </li>
          <li>
            <router-link v-bind:to="{name:'free',params:{no:2}}">선물 추천</router-link>
          </li>
          <li>
            <router-link v-bind:to="{name:'free',params:{no:3}}">고민 상담</router-link>
          </li>
          <li>
            <router-link v-bind:to="{name:'free',params:{no:4}}">편지 쓰기</router-link>
          </li>
          <li>
            <router-link v-bind:to="{name:'free',params:{no:5}}">경조사 장소 알려주세요!</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";

export default {
  name: "boardlist",
  components: {
    "b-nav": NavbarVue
  }
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
</style>