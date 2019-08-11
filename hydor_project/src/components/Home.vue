<template>
<div>
  <p>안녕하세요 님!!</p>
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
</div>
</template>
<script>
import Slider from '@jeremyhamm/vue-slider'
export default{
  components: {
    'slider': Slider
  }
}
</script>
<style>
</style>
