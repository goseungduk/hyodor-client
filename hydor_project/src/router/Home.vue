<template>
  <div>
    <h-nav current-page="home"></h-nav>
    <b-container class="mt-4">

      <b-row>
        <b-col md>
          <vue-cal
          class="calendar"
          :locale="'ko'"
          :time-from="7 * 60"
          :time-to="23 * 60"
          xsmall
          hide-view-selector
          click-to-navigate
          :time="false"
          default-view="month"
          :min-date="minDate"
          :max-date="maxDate"
          :events="events"
        ></vue-cal>
        </b-col>
        <b-col md class="col-color mt-2" >
          <div class="mt-1" style="font-size:20px; text-align:center; color:gray;"> 2019년 8월 14일</div>
          <h3 class="mb-3 mt-2" >8월14일의 효도 현황은 . . . </h3>
          <div> 방문횟수 : 0번     전화횟수 : 0번</div>
          <div class="mb-2"> 방문시간 : 0시간   전화시간 : 0시간<b-button class="btn-color" size="sm">효도추가</b-button><b-button class="btn-color" size="sm">효도삭제</b-button></div>
          
          
          <h3 class="mt-1" >8월 14일의 일정은 . . . </h3>
          <div style="color:gray;">오늘은 일정이 없어요!</div>
        <b-button class="btn-color mb-2" size="sm"
          @click="events.push({
        start: '2019-08-14 12:00',
        end: '2019-08-14 17:00',
        title: 'A new event',
        class: 'blue-event'
      })"
        >일정추가</b-button>
        <b-button  class="btn-color mb-2" size="sm"  @click="events.pop()">일정삭제</b-button>
      
        </b-col>
        
      </b-row>
      
       <b-row>
        <b-col>
          <div style="font-weight:bold; color:green;" class="mt-1 mb-1">8월의 방문(30% 달성)</div>
          <div class="progress-outer">      
          <b-progress :value="value" :max="max" variant="success" :striped="striped" show-progress></b-progress>  
            </div>
      
        </b-col>
      </b-row>
        <b-row>
        <b-col>
          <div style="font-weight:bold; color:#FFD400" class="mb-1">8월의 전화(25% 달성)</div>
          <div class="progress-outer">      
          <b-progress :value="value" :max="max" variant="warning" :striped="striped" show-progress></b-progress>  
            </div>
      </b-col>
      </b-row>

    </b-container>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import 'vue-cal/dist/i18n/ko.js'
import * as session from "../utils/loginService";
export default {
  data: () => ({
    events: [
      {
        start: "2019-08-19 10:35",
        end: "2019-08-19 11:30",
        title: "Doctor appointment",
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: "health"
      }
    ],
    value:4,
    max: 10,
    striped:true
  }),
  computed: {
    nick() {
      return localStorage.username;
    },
    minDate() {
      let now = new Date();
      let date = new Date(now);
      date.setDate(now.getDate() - 15);
      return date;
    },
    maxDate() {
      let now = new Date();
      let date = new Date(now);
      date.setDate(now.getDate() + 15);
      return date;
    }
  },
  components: {
    "h-nav": NavbarVue,
    "vue-cal": VueCal
  },
  mounted:function(){
    session.loginRefresh()
    .then((response)=>{
      console.log(response);
    })
    .catch((e)=>{
      if (e.response.status == 401) {
          alert("다시 로그인 해주세요!!");
          this.items = [];
          location.href = "/login";
      } else {
          alert("서버오류!");
      }
    })
  }
};
</script>
<style scoped>

.calendar {
  height: 30em;
}
.btn-color{
  color: #5f90df;
  background-color: rgba(0,0,0,0);
  border: 1.5px solid #5f90df;
  font-size:13.5px;
  float: right;
  
}
.col-color{
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
}
.btn-color:hover{
  
  color: white;
  background: linear-gradient( 45deg, #5153c2, #5f90df, #96d1f3 );
}
.progress-outer{
    background: #fff;
    padding: 5px 60px 5px 5px;
    border: 5px solid #bebfbf;
    border-radius: 45px;
    margin-bottom: 20px;
    position: relative;
}
.progress{
    background: white;
    border-radius: 20px;
    margin: 0;
}
.progress .progress-bar{
    border-radius: 20px;
    box-shadow: none;
    
}
</style>