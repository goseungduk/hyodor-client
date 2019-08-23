<template>
  <div>
    <h-nav current-page="home"></h-nav>
    <b-container class="mt-4">
      <b-row>
        <b-col md>
          <vue-cal
            class="calendar"
            :locale="'ko'"
            
            xsmall
            hide-view-selector
            :selected-date="cal.selected"
            
            default-view="month"
            :disable-views="['day', 'week']"
            :events="events"
            @cell-focus="onCalChanged"
            :on-event-click="onEventClick"
          ></vue-cal>
        </b-col>
        <b-col md class="col-color mt-2">
          <div class="mt-1 mb-3" style="font-size:20px; text-align:center; color:gray;">{{ moment(cal.selected, "LL") }}</div>
          
<!-- 
          <h3 class="mt-1">{{ moment(cal.selected, "MMM Do") }}의 일정은 . . .</h3>
          <div style="color:gray;">오늘은 일정이 없어요!</div> -->
          
          <div>
            <v-wait for="contentloading">
            <template slot="waiting">
              <div class="text-center mt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
              </div>
            </template>
          </v-wait>
            <b-list-group v-wair:hidden="'contentloading'">
              <b-list-group-item v-for="i in birthdayScheduleList" :key="i.id" class="flex-column align-items-start">
                <!-- <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ i.name }} ({{ i.relation }}) 님 생신</h5>
                  <small>3 days ago</small>
                </div>

                <p class="mb-1">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                </p>

                <small>Donec id elit non mi porta.</small> -->
                <i class="fas fa-notes-medical mr-2"></i> {{ i.name }} ({{ i.relation }}) 님의 건강검진이 올해 필요합니다.
              </b-list-group-item>
            </b-list-group>
          </div>

        </b-col>
      </b-row>

      <b-card class="col-color mt-1" v-for="i in groups" :key="i.id" :title="i.name">
        <b-card-text>
          <b-row>
            <b-col>
              <div
                style="font-weight:bold; color:#FFD400"
                class="mb-1"
              >{{ new Date().getMonth() + 1 }}월의 전화({{ perGroupCallProgress[i.id] }}% 달성) ({{perGroupCalledList[i.id]}}/{{i.prefer_call}})</div>
              <div class="progress-outer">
                <b-progress
                  :value="perGroupCallProgress[i.id]"
                  :max="100"
                  variant="warning"
                  :striped="striped"
                  show-progress
                ></b-progress>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div
                style="font-weight:bold; color:green;"
                class="mt-1 mb-1"
              >{{ new Date().getMonth() + 1 }}월의 방문({{perGroupVisitProgress[i.id]}}% 달성) ({{perGroupVisitedList[i.id]}}/{{i.prefer_visit}})</div>
              <div class="progress-outer">
                <b-progress
                  :value="perGroupVisitProgress[i.id]"
                  :max="100"
                  variant="success"
                  :striped="striped"
                  show-progress
                ></b-progress>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
        <b-card-text class="text-right">
          오늘 나는
          <b-button class="col-btn"  size="sm" @click="makeCall(i.id)">전화</b-button>/
          <b-button class="col-btn" size="sm" @click="makeVisit(i.id)">방문</b-button>하였습니다.니다.
        </b-card-text>
      </b-card>
    </b-container>

    <b-modal id="modal-calinfo" size="lg" :title="moment(cal.selected, 'LL')" ok-only no-stacking>{{ selectedEvent.title }}</b-modal>

    <b-modal id="modal-info" :title="modal.title" ok-only no-stacking>{{modal.content}}</b-modal>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/ko.js";
import "moment/locale/ko";
import moment from 'moment'
import * as session from "../utils/loginService";
export default {
  components: {
    "h-nav": NavbarVue,
    "vue-cal": VueCal
  },
  data: () => ({
    modal: {
      title: "",
      content: "",
    },
    groups: [],
    parents: [],

    const: {
      call: 10,
      visit: 11,
      birthday: 20
    },

    cal: {
      selected: new Date()
    },
    selectedEvent: {},

    schedules: [],

    events: [
      
    ],
    eventmap: {},
    value: 4,
    max: 10,
    striped: true
  }),
  
  computed: {
    today() {
      return moment(this.cal.selected).format('LL');
    },
    birthdayScheduleList() {
      return this.parents.filter(i => {
        let bday = new Date(i.birthday);
        return !(bday.getYear() % 2 + new Date().getYear() % 2 == 1)
      })
    },
    calledList() {
      return this.schedules.filter(sch => {
        return sch.type == this.const.call;
      });
    },
    visitedList() {
      return this.schedules.filter(sch => {
        return sch.type == this.const.visit;
      });
    },
    perGroupCalledList() {
      let output = {};
      this.groups.forEach(i => {
        output[i.id] = 0
      });
      this.calledList.forEach(sch => {
        try {
          output[JSON.parse(sch.content).group] += 1;
        } catch (error) {
          
        }
        
      });
      return output;
    },
    perGroupVisitedList() {
      let output = {};
      this.groups.forEach(i => {
        output[i.id] = 0
      });
      this.visitedList.forEach(sch => {
        try {
          output[JSON.parse(sch.content).group] += 1;
        } catch (error) {
          
        }
        
      });
      return output;
    },
    perGroupCallProgress() {
      let output = {};
      this.groups.forEach(i => {
        let val = this.perGroupCalledList[i.id] / i.prefer_call;
        if (!val) {
          output[i.id] = 0
        }
        else {
          try{
            output[i.id] = Math.ceil(Math.min(val,1) * 100)
          }
          catch (error) {
          }
        }
      });
      return output;
    },
    perGroupVisitProgress() {
      let output = {};
      this.groups.forEach(i => {
        let val = this.perGroupVisitedList[i.id] / i.prefer_call;
        if (!val) {
          output[i.id] = 0
        }
        else {
          try{
            output[i.id] = Math.ceil(Math.min(val,1) * 100)
          }
          catch (error) {
          }
        }
      });
      return output;
    },
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
  methods: {
    onEventClick (event, e) {
      this.selectedEvent = event
      this.showDialog = true

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation()
    },

    onCalChanged(dt) {
      this.cal.selected = dt;

    },
    moment(d, fmt) {
      return moment(d).format(fmt);
    },
    calendarEvents() {
      this.parents.forEach(i => {
        let dt = new Date(i.birthday);
        dt.setFullYear(new Date().getFullYear());
        this.events.push({
          
          start: dt.toISOString().slice(0,10),
          end: dt.toISOString().slice(0,10),
          title: i.name + " (" + i.relation + ")" + "님 생신"
        });
        
      });
    },
    updateAll() {
      this.updateParents();
      this.updateSchedules();
      this.updateGroupList();

      

    },
    updateParents() {
      this.$wait.start("contentloading");
      session.get(session.apiurl + "parent").then(response => {
        this.parents = response.data.parents;
        this.events = [];
        this.eventmap = {};
        this.calendarEvents();
        this.$wait.end("contentloading");
      })
      .catch(error => {
        this.$wait.end("contentloading");
      });
    },
    updateGroupList() {
      session.get(session.apiurl + "parentgroup").then(response => {
        this.groups = response.data.groups;
        
      });
    },
    updateSchedules() {
      session.get(session.apiurl + "schedule").then(response => {
        this.schedules = response.data.schedules;
      });
    },
    makeCall(group_id) {
      session.post(session.apiurl + "schedule", {
        type: this.const.call,
        content: JSON.stringify({ group: group_id }),
        datetime: new Date().toISOString().slice(0,10)
      })
      .then(response => {
        this.modal.title = "저장 완료";
        this.modal.content = "전화 기록을 성공적으로 저장했습니다.";
        this.$bvModal.show("modal-info");
        this.updateSchedules()
      })
    },
    makeVisit(group_id) {
      session.post(session.apiurl + "schedule", {
        type: this.const.visit,
        content: JSON.stringify({ group: group_id }),
        datetime: new Date().toISOString().slice(0,10)
      })
      .then(response => {
        this.modal.title = "저장 완료";
        this.modal.content = "방문 기록을 성공적으로 저장했습니다.";
        this.$bvModal.show("modal-info");
        this.updateSchedules()
      })
    }
  },
  mounted: function() {
    this.updateAll();

    session
      .loginRefresh()
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        if (e.response.status == 401) {
          location.href = "/login";
        } else {
          location.href = "/login";
        }
      });
  }
};
</script>
<style scoped>
.calendar {
  height: 30em;
}
.btn-color {
  color: #5f90df;
  background-color: rgba(0, 0, 0, 0);
  border: 1.5px solid #5f90df;
  font-size: 13.5px;
  float: right;
}
.col-color {
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
}
.btn-color:hover {
  color: white;
  background: linear-gradient(45deg, #5153c2, #5f90df, #96d1f3);
}
.progress-outer {
  background: #fff;
  padding: 5px 5px 5px 5px;
  border: 5px solid #bebfbf;
  border-radius: 45px;
  margin-bottom: 20px;
  position: relative;
}
.progress {
  background: white;
  border-radius: 20px;
  margin: 0;
}
.progress .progress-bar {
  border-radius: 20px;
  box-shadow: none;
}
.col-btn{
  border:none;
  color: #5153c2;
  background-color: rgba(0, 0, 0, 0);
  font-size: 20px;
}
.col-btn:hover{
  font-weight: bold;
}
</style>