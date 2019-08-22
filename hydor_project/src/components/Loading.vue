<template>
  <div class="fullscn">
    <b-card class="spinner">
      <b-spinner label="Loading..." variant="dark"></b-spinner>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "loading",
  components: {}
};
</script>
<style scoped>
.fullscn {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.spinner {
  position: absolute;
  left: 5;
  top: 5;
  margin-top: 10%;
  margin-left: 47%;
}
</style>