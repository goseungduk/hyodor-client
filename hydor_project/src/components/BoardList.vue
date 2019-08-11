<template>
<div>
    <div id="app" ref="app">
    <slider :width="280" format="overlay" direction="left" :opacity="0.15"
    :links="[{'id':1,'text':'방문,전화 기록일기','url':'#'},
    {'id':2,'text':'복지 정보','url':'#'},
    {'id':3,'text':'게시판','url':'http://localhost:8080/boardlist'},
    {'id':4,'text':'마이페이지','url':'#'}
    ] "></slider> 
    <!-- https://github.com/jeremyhamm/vue-slider -->
    <!-- url href로 안하고 vue-router로 하면 깔끔한데 
        소스 수정을 해야함. 수정은 간단함. -->
    <!-- 근데 Github에서 어떻게 온전히 가져오지...? -->
  </div>
<div class="header">
    <nav>
      <ul>
        <li><router-link v-bind:to="{name:'free'}">자유게시판</router-link></li>
        <li><router-link v-bind:to="{name:'gift'}">선물 추천</router-link></li>
        <li><router-link v-bind:to="{name:'gomin'}">고민 상담</router-link></li>
        <li><router-link v-bind:to="{name:'letter'}">편지 쓰기</router-link></li>
        <li><router-link v-bind:to="{name:'partyPlace'}">경조사 장소 알려주세요!</router-link></li>
      </ul>
    </nav>
</div>
  <div class="container">
      
      <router-view></router-view>
    </div>
</div>  
</template>
<script>
import Slider from '@jeremyhamm/vue-slider'
export default{
    name:'boardlist',
    components:{
        'slider':Slider
    }
}
</script>
<style>
.header{background-color:aqua; padding: 10px 0px 0px 0px;}
.headerText{padding:0px 20px 0px 20px;}
ul{list-style-type:none;margin:0; padding:0;
overflow: hidden; background-color:purple;}
li{float:left;}
li a{display: block; color: yellow; text-align:center;
padding:14px 16px; text-decoration:none;}
li a:hover{background-color: aqua; color:black;}

</style>