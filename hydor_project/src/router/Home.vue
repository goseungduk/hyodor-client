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
        <button
          @click="events.push({
        start: '2019-08-14 12:00',
        end: '2019-08-14 17:00',
        title: 'A new event',
        class: 'blue-event'
      })"
        >Add an event</button>
        <button @click="events.pop()">Remove last event</button>
        </b-col>
        <b-col md>
          <p>asdfasdf</p>
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
    ]
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
  }
};
</script>
<style scoped>

.calendar {
  height: 30em;
}

</style>
