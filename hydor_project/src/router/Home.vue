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
        <b-col md class="col-color mt-2">
          <div class="mt-1" style="font-size:20px; text-align:center; color:gray;">2019년 8월 14일</div>
          

          <h3 class="mt-1">8월 14일의 일정은 . . .</h3>
          <div style="color:gray;">오늘은 일정이 없어요!</div>
          <b-button
            class="btn-color mb-2"
            size="sm"
            @click="events.push({
        start: '2019-08-14 12:00',
        end: '2019-08-14 17:00',
        title: 'A new event',
        class: 'blue-event'
      })"
          >일정추가</b-button>
          <b-button class="btn-color mb-2" size="sm" @click="events.pop()">일정삭제</b-button>
        </b-col>
      </b-row>

      <b-card v-for="i in groups" :key="i.id" :title="i.name">
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
          <b-button variant="light" size="sm" @click="makeCall(i.id)">전화</b-button>/
          <b-button variant="light" size="sm" @click="makeVisit(i.id)">방문</b-button>하였습니다.
        </b-card-text>
      </b-card>
    </b-container>

    <b-modal id="modal-addtype" size="lg" title="First Modal" ok-only no-stacking></b-modal>
  </div>
</template>
<script>
import NavbarVue from "../components/Navbar.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/ko.js";
import * as session from "../utils/loginService";
export default {
  components: {
    "h-nav": NavbarVue,
    "vue-cal": VueCal
  },
  data: () => ({
    groups: [],

    const: {
      call: 10,
      visit: 11
    },

    schedules: [],

    events: [
      {
        start: "2019-08-19 10:35",
        end: "2019-08-19 11:30",
        title: "Doctor appointment",
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: "health"
      }
    ],
    value: 4,
    max: 10,
    striped: true
  }),
  methods: {
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
        alert("success");
      })
    },
    makeVisit(group_id) {
      session.post(session.apiurl + "schedule", {
        type: this.const.visit,
        content: JSON.stringify({ group: group_id }),
        datetime: new Date().toISOString().slice(0,10)
      })
      .then(response => {
        alert("success");
      })
    }
  },
  computed: {
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
            output[i.id] = Math.min(val,1) * 100
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
            output[i.id] = Math.min(val,1) * 100
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

  mounted: function() {
    this.updateGroupList();
    this.updateSchedules();

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
  padding: 5px 60px 5px 5px;
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
</style>