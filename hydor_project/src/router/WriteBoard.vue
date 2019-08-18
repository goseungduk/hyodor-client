<template>
  <div>
    <b-form-input v-model="title" placeholder="제목을 입력하세요"></b-form-input>
    <b-form-textarea
      id="textarea"
      v-model="content"
      placeholder="내용을 입력하세요"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button variant="outline-primary" @click="submit()">Button</b-button>
  </div>
</template>
<script>
import mapState from 'vuex';
export default {
    props:{
        no:{type:Number}
    },
    data:function(){
        return {
            title:'',
            content:''
        }
    },
    
    // computed:mapState(['no'])
};
</script>
<style scoped>
</style>